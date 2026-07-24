import { NextResponse } from "next/server";
import { reviewSchema } from "@/lib/validation";
import { postToAppsScript } from "@/lib/apps-script";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  try {
    // Apps Script always writes Status=Pending; only rows manually flipped to
    // "Approved" in the sheet are ever surfaced by the approvedReviews endpoint.
    await postToAppsScript("review", data);
  } catch (err) {
    console.error("Review form → Apps Script failed:", err);
    return NextResponse.json({ error: "Failed to submit. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
