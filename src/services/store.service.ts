import { prisma } from '../config/prisma.js';

export const list = () => prisma.store.findMany();
export const getById = (id: string) => prisma.store.findUnique({ where: { id } });
export const create = () => Promise.resolve();
export const update = () => Promise.resolve();
export const remove = () => Promise.resolve();
