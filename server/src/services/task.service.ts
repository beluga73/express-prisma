import { prisma } from "../lib/prisma.js";

export const taskService = {
  async getAll() {
    return await prisma.tasks.findMany();
  },
  async getById(id: number) {
    return await prisma.tasks.findUnique({
      where: { id },
    });
  },
  async create(data: { title: string }) {
    return await prisma.tasks.create({ data });
  },
};
