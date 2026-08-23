/**
 * In-memory fixed-window rate limiter. Good enough for a single Next.js
 * server instance; resets on redeploy. Not distributed, don't rely on it
 * across multiple instances/regions.
 */
const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
