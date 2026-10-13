import { serve } from '@hono/node-server';
import { createApp } from './app.js';
import { config } from './config/index.js';

const app = createApp();

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`Server listening on port ${info.port}`);
});
