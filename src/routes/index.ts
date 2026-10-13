import { Hono } from 'hono';
import { createStoreController } from '../controllers/store.controller.js';
import { createCustomerController } from '../controllers/customer.controller.js';
import { createInvoiceController } from '../controllers/invoice.controller.js';

export function createRoutes() {
  const app = new Hono();

  app.route('/stores', createStoreController());
  app.route('/customers', createCustomerController());
  app.route('/invoices', createInvoiceController());

  return app;
}
