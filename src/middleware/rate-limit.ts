import { rateLimiter } from 'hono-rate-limiter';

const WINDOW_MS = 60_000;
const LIMIT = 1000;

export interface RateLimitOptions {
  windowMs?: number;
  limit?: number;
}

export function rateLimit(options?: RateLimitOptions) {
  return rateLimiter({
    windowMs: options?.windowMs ?? WINDOW_MS,
    limit: options?.limit ?? LIMIT,
    standardHeaders: true,
    keyGenerator: (c) => c.req.header('x-forwarded-for') ?? 'anonymous',
    message: { error: 'Too many requests' },
  });
}
