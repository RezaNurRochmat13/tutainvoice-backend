import { Hono } from 'hono';
import * as customerService from '../services/customer.service.js';

export function createCustomerController() {
  const app = new Hono();

  app.get('/', async (c) => {
    const customers = await customerService.list();
    return c.json(customers);
  });

  app.get('/:id', async (c) => {
    const customer = await customerService.getById(c.req.param('id'));
    return c.json(customer);
  });

  app.post('/', async (c) => c.json({ message: 'Not implemented' }, 501));
  app.put('/:id', async (c) => c.json({ message: 'Not implemented' }, 501));
  app.delete('/:id', async (c) => c.json({ message: 'Not implemented' }, 501));

  return app;
}
