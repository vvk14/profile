import { NextResponse } from "next/server";
import { getApprovedReviews } from "@/lib/reviews";

export const revalidate = 3600; // re-check the sheet at most once an hour

export async function GET() {
  const reviews = await getApprovedReviews();
  return NextResponse.json({ reviews });
}
