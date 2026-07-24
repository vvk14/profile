import { NextResponse } from "next/server";
import { postToAppsScript, getLikeCount } from "@/lib/apps-script";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const count = await getLikeCount(slug);
  return NextResponse.json({ count });
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const result = await postToAppsScript("like", { slug });
    return NextResponse.json({ ok: true, count: result.count });
  } catch (err) {
    console.error("Like → Apps Script failed:", err);
    // TODO: remove `debug` once the Apps Script connection is confirmed working
    return NextResponse.json(
      { error: "Failed to like. Please try again shortly.", debug: String(err) },
      { status: 502 }
    );
  }
}
