import { Hono } from 'hono';
import { describe, expect, it } from 'vitest';
import { createApp } from '../../src/app.js';
import { rateLimit } from '../../src/middleware/rate-limit.js';

describe('rate limit', () => {
  it('responds 429 with json body after exceeding limit', async () => {
    const app = new Hono();
    app.use(rateLimit({ windowMs: 60_000, limit: 2 }));
    app.get('/ping', (c) => c.json({ pong: true }));

    const headers = { 'x-forwarded-for': 'test-429' };
    await app.request('/ping', { headers });
    await app.request('/ping', { headers });
    const res = await app.request('/ping', { headers });

    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: 'Too many requests' });
    expect(res.headers.get('RateLimit-Limit')).toBe('2');
  });

  it('keeps /health unlimited', async () => {
    const app = createApp();
    const headers = { 'x-forwarded-for': 'test-health' };
    for (let i = 0; i < 5; i++) {
      const res = await app.request('/health', { headers });
      expect(res.status).toBe(200);
    }
  });
});
