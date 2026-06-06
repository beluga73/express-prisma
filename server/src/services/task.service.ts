import { prisma } from "../lib/prisma";
import type {
  TaskParams,
  CreateTaskRequest,
  UpdateTasksResponse,
} from "../schemas/task.schema";

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
    const lastTaskInColumn = await prisma.tasks.findFirst({
      where: { columnId: data.columnId },
      orderBy: {
        position: "desc",
      },
    });

    const position = lastTaskInColumn ? lastTaskInColumn.position + 1 : 0;

    return await prisma.tasks.create({
      data: {
        ...data,
        position,
      },
    });
  },
  async update(id: TaskParams["id"], data: UpdateTasksResponse) {
    return await prisma.tasks.update({
      where: { id },
      data,
    });
  },
  async delete(id: TaskParams["id"]) {
    return await prisma.tasks.delete({
      where: { id },
    });
  },
};
