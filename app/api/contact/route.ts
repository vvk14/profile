import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { postToAppsScript } from "@/lib/apps-script";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: bots fill hidden fields, humans never see them.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await postToAppsScript("contact", data);
  } catch (err) {
    console.error("Contact form → Apps Script failed:", err);
    return NextResponse.json({ error: "Failed to submit. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
