import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createRoutes } from './routes/index.js';

export function createApp() {
  const app = new Hono();

  app.use('/*', cors({ origin: 'http://localhost:5173' }));

  app.get('/health', (c) => c.json({ status: 'ok' }));

  app.route('/', createRoutes());

  return app;
}
