import { prisma } from "../lib/prisma.js";
import type { CreateTask } from "../schemas/task.schema.js";

export const taskService = {
  async getAll() {
    return await prisma.tasks.findMany();
  },
  async getById(id: number) {
    return await prisma.tasks.findUnique({
      where: { id },
    });
  },
  async create(data: CreateTask) {
    return await prisma.tasks.create({ data });
  },
};
