/**
 * Talks to the Google Apps Script Web App that backs the contact form,
 * review system, blog comments, and blog likes (see apps-script/Code.gs +
 * SETUP.md). Until GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_SECRET are set, calls
 * log and no-op instead of throwing, so forms stay fully clickable in dev.
 */

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const SCRIPT_SECRET = process.env.GOOGLE_SCRIPT_SECRET;

function isConfigured() {
  return Boolean(SCRIPT_URL && SCRIPT_SECRET);
}

export async function postToAppsScript(action: "contact" | "review" | "comment" | "like", payload: Record<string, unknown>) {
  if (!isConfigured()) {
    console.warn(`[apps-script:stub] Would POST action="${action}":`, payload);
    return { stubbed: true, count: 1 };
  }

  const res = await fetch(SCRIPT_URL!, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids Apps Script's CORS preflight on simple POSTs
    body: JSON.stringify({ ...payload, action, secret: SCRIPT_SECRET }),
  });

  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);

  // Apps Script's doPost always replies with HTTP 200, even on logical
  // failures (bad secret, unknown action); the real result is in the body.
  const data = await res.json();
  if (data.ok === false) throw new Error(`Apps Script error: ${data.error}`);
  return data;
}

async function getFromAppsScript(action: string, params: Record<string, string> = {}, revalidate = 300) {
  if (!SCRIPT_URL) return null;

  try {
    const query = new URLSearchParams({ action, ...params }).toString();
    const res = await fetch(`${SCRIPT_URL}?${query}`, { next: { revalidate } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export interface ApprovedReview {
  name: string;
  company: string;
  rating: number;
  message: string;
  photoUrl?: string;
}

export async function getApprovedReviewsFromScript(): Promise<ApprovedReview[] | null> {
  const data = await getFromAppsScript("approvedReviews", {}, 3600);
  return data?.reviews ?? null;
}

export interface ApprovedComment {
  name: string;
  comment: string;
  date: string;
}

export async function getApprovedComments(slug: string): Promise<ApprovedComment[]> {
  const data = await getFromAppsScript("approvedComments", { slug }, 120);
  return data?.comments ?? [];
}

export async function getLikeCount(slug: string): Promise<number> {
  const data = await getFromAppsScript("likeCount", { slug }, 30);
  return data?.count ?? 0;
}
