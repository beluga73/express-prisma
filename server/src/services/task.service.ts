import { LexoRank } from "lexorank";
import { prisma } from "../lib/prisma";
import type {
  TaskParams,
  CreateTaskRequest,
  UpdateTaskRequest,
  MoveTaskRequest,
} from "../schemas/task.schema";

const calculatePosition = (
  prevPosition?: string | null,
  nextPosition?: string | null,
) => {
  if (prevPosition && nextPosition) {
    return LexoRank.parse(prevPosition)
      .between(LexoRank.parse(nextPosition))
      .toString();
  }
  if (prevPosition) {
    return LexoRank.parse(prevPosition).genNext().toString();
  }
  if (nextPosition) {
    return LexoRank.parse(nextPosition).genPrev().toString();
  }
  return LexoRank.middle().toString();
};

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

    const position = lastTaskInColumn
      ? LexoRank.parse(lastTaskInColumn.position).genNext().toString()
      : LexoRank.middle().toString();

    return await prisma.tasks.create({
      data: {
        ...data,
        position,
      },
    });
  },
  async update(id: TaskParams["id"], data: UpdateTaskRequest) {
    return await prisma.tasks.update({
      where: { id },
      data,
    });
  },
  async move(id: TaskParams["id"], data: MoveTaskRequest) {
    const { columnId, prevId, nextId } = data;

    const [prevTask, nextTask] = await Promise.all([
      prevId ? prisma.tasks.findUnique({ where: { id: prevId } }) : null,
      nextId ? prisma.tasks.findUnique({ where: { id: nextId } }) : null,
    ]);

    const position = calculatePosition(prevTask?.position, nextTask?.position);

    return await prisma.tasks.update({
      where: { id },
      data: { columnId, position },
    });
  },
  async delete(id: TaskParams["id"]) {
    return await prisma.tasks.delete({
      where: { id },
    });
  },
};
