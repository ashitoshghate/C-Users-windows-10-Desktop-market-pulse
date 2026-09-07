// In-memory rate limiter. Resets on server restart and is per-instance only
// (not shared across serverless invocations) — good enough as a first line
// of defense against casual abuse. For real production scale, replace this
// with a shared store (e.g. Redis, DynamoDB) keyed the same way.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
