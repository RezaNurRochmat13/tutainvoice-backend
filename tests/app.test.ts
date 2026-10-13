import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

describe('app', () => {
  const app = createApp();

  it('responds on GET /health', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: 'ok' });
  });

  it('mounts stores routes', async () => {
    const res = await app.request('/stores');
    expect(res.status).not.toBe(404);
  });

  it('mounts customers routes', async () => {
    const res = await app.request('/customers');
    expect(res.status).not.toBe(404);
  });

  it('mounts invoices routes', async () => {
    const res = await app.request('/invoices');
    expect(res.status).not.toBe(404);
  });
});
