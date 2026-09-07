// In-memory rate limiter. Resets on server restart and is per-instance only
// (not shared across serverless invocations) — good enough as a first line
// of defense against casual abuse. For real production scale, replace this
// with a shared store (e.g. Redis, DynamoDB) keyed the same way.

const DEFAULT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const DEFAULT_MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  options?: { windowMs?: number; max?: number }
): boolean {
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const max = options?.max ?? DEFAULT_MAX_REQUESTS;

  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);

  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
