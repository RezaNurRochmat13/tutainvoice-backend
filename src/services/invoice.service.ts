import { prisma } from '../config/prisma.js';

export const list = () => prisma.invoice.findMany({ include: { items: true } });
export const getById = (id: string) =>
  prisma.invoice.findUnique({ where: { id }, include: { items: true } });
export const create = () => Promise.resolve();
export const update = () => Promise.resolve();
export const remove = () => Promise.resolve();
