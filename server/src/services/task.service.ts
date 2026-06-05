import { prisma } from "../lib/prisma";
import type { CreateTask } from "../schemas/task.schema";

export const taskService = {
  async getAll() {
    return await prisma.column.findMany({
      orderBy: { position: "asc" },
      include: {
        tasks: {
          orderBy: { position: "asc" },
        },
      },
    });
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
