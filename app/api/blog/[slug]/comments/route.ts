import { NextResponse } from "next/server";
import { commentSchema } from "@/lib/validation";
import { postToAppsScript, getApprovedComments } from "@/lib/apps-script";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comments = await getApprovedComments(slug);
  return NextResponse.json({ comments });
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json();
  const parsed = commentSchema.safeParse({ ...body, slug });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  try {
    // Apps Script always writes Status=Pending; only rows manually flipped
    // to "Approved" in the sheet are ever surfaced by the GET above.
    await postToAppsScript("comment", data);
  } catch (err) {
    console.error("Comment → Apps Script failed:", err);
    // TODO: remove `debug` once the Apps Script connection is confirmed working
    return NextResponse.json(
      { error: "Failed to submit. Please try again shortly.", debug: String(err) },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
