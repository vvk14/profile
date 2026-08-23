import { NextResponse } from "next/server";
import { themeDetectSchema } from "@/lib/validation";
import { detectShopifyTheme } from "@/lib/theme-detector";
import { postToAppsScript } from "@/lib/apps-script";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const RATE_LIMIT_PER_MINUTE = 10;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`detect-theme:${ip}`, RATE_LIMIT_PER_MINUTE)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = themeDetectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const detection = await detectShopifyTheme(parsed.data.url);

  if (!detection.ok) {
    const status = detection.error.type === "not_shopify" ? 422 : 502;
    return NextResponse.json({ error: detection.error.message }, { status });
  }

  const { result } = detection;

  try {
    await postToAppsScript("themeDetect", {
      submittedUrl: result.submittedUrl,
      shopHandle: result.shop.shopHandle ?? "",
      themeName: result.theme.name ?? "",
      schemaName: result.theme.schemaName ?? "",
      themeStoreId: result.theme.themeStoreId ?? "",
      seoScore: result.seoScore,
      country: result.shop.country ?? "",
    });
  } catch (err) {
    // A logging failure should never break the tool for the person using it.
    console.error("Theme detect → Apps Script log failed:", err);
  }

  return NextResponse.json({ result });
}
