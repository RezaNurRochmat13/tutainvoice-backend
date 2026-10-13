import { Hono } from 'hono';
import * as storeService from '../services/store.service.js';

export function createStoreController() {
  const app = new Hono();

  app.get('/', async (c) => {
    const stores = await storeService.list();
    return c.json(stores);
  });

  app.get('/:id', async (c) => {
    const store = await storeService.getById(c.req.param('id'));
    return c.json(store);
  });

  app.post('/', async (c) => c.json({ message: 'Not implemented' }, 501));
  app.put('/:id', async (c) => c.json({ message: 'Not implemented' }, 501));
  app.delete('/:id', async (c) => c.json({ message: 'Not implemented' }, 501));

  return app;
}
