import { prisma } from "../lib/prisma";
import type { CreateTaskRequest } from "../schemas/task.schema";

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
  async create(data: CreateTaskRequest) {
    return await prisma.tasks.create({ data });
  },
};
