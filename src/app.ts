import { Hono } from 'hono';
import { createRoutes } from './routes/index.js';

export function createApp() {
  const app = new Hono();

  app.get('/health', (c) => c.json({ status: 'ok' }));

  app.route('/', createRoutes());

  return app;
}
