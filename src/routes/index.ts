import { Hono } from 'hono';
import { createStoreController } from '../controllers/store.controller.js';
import { createCustomerController } from '../controllers/customer.controller.js';
import { createInvoiceController } from '../controllers/invoice.controller.js';
import { rateLimit } from '../middleware/rate-limit.js';

export function createRoutes() {
  const app = new Hono();

  app.use(rateLimit());

  app.route('/stores', createStoreController());
  app.route('/customers', createCustomerController());
  app.route('/invoices', createInvoiceController());

  return app;
}
