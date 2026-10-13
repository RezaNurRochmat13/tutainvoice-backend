import { describe, expect, it } from 'vitest';
import { prisma } from '../../src/config/prisma.js';

describe('prisma client', () => {
  it('exposes expected models', () => {
    expect(prisma.store).toBeDefined();
    expect(prisma.customer).toBeDefined();
    expect(prisma.invoice).toBeDefined();
    expect(prisma.invoiceItem).toBeDefined();
  });

  it('is a singleton (same reference)', async () => {
    const mod = await import('../../src/config/prisma.js');
    expect(mod.prisma).toBe(prisma);
  });
});
