/**
 * Talks to the Google Apps Script Web App that backs the contact form and
 * review system (see apps-script/Code.gs + SETUP.md). Until GOOGLE_SCRIPT_URL
 * and GOOGLE_SCRIPT_SECRET are set, calls log and no-op instead of throwing,
 * so the forms stay fully clickable during development.
 */

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const SCRIPT_SECRET = process.env.GOOGLE_SCRIPT_SECRET;

function isConfigured() {
  return Boolean(SCRIPT_URL && SCRIPT_SECRET);
}

export async function postToAppsScript(action: "contact" | "review", payload: Record<string, unknown>) {
  if (!isConfigured()) {
    console.warn(`[apps-script:stub] Would POST action="${action}":`, payload);
    return { stubbed: true };
  }

  const res = await fetch(SCRIPT_URL!, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids Apps Script's CORS preflight on simple POSTs
    body: JSON.stringify({ ...payload, action, secret: SCRIPT_SECRET }),
  });

  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);

  // Apps Script's doPost always replies with HTTP 200, even on logical
  // failures (bad secret, unknown action) — the real result is in the body.
  const data = await res.json();
  if (data.ok === false) throw new Error(`Apps Script error: ${data.error}`);
  return data;
}

export interface ApprovedReview {
  name: string;
  company: string;
  rating: number;
  message: string;
  photoUrl?: string;
}

export async function getApprovedReviewsFromScript(): Promise<ApprovedReview[] | null> {
  if (!SCRIPT_URL) return null;

  try {
    const res = await fetch(`${SCRIPT_URL}?action=approvedReviews`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.reviews ?? [];
  } catch {
    return null;
  }
}
