import { Hono } from 'hono';
import * as invoiceService from '../services/invoice.service.js';

export function createInvoiceController() {
  const app = new Hono();

  app.get('/', async (c) => {
    const invoices = await invoiceService.list();
    return c.json(invoices);
  });

  app.get('/:id', async (c) => {
    const invoice = await invoiceService.getById(c.req.param('id'));
    return c.json(invoice);
  });

  app.post('/', async (c) => c.json({ message: 'Not implemented' }, 501));
  app.put('/:id', async (c) => c.json({ message: 'Not implemented' }, 501));
  app.delete('/:id', async (c) => c.json({ message: 'Not implemented' }, 501));

  return app;
}
