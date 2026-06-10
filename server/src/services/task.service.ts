import { LexoRank } from "lexorank";
import { prisma } from "../lib/prisma";
import { AppError } from "@/lib/errors";
import type { UserId } from "@/schemas/auth.schema";
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
  async getAll(userId: UserId) {
    return await prisma.column.findMany({
      where: { userId },
      orderBy: { position: "asc" },
      include: {
        tasks: {
          orderBy: { position: "asc" },
        },
      },
    });
  },
  async create(userId: UserId, data: CreateTaskRequest) {
    const column = await prisma.column.findFirst({
      where: { id: data.columnId, userId },
      include: { tasks: { orderBy: { position: "desc" }, take: 1 } },
    });
    if (!column) throw new AppError("TASK_NOT_FOUND");

    const position = column.tasks[0]
      ? LexoRank.parse(column.tasks[0].position).genNext().toString()
      : LexoRank.middle().toString();

    return await prisma.task.create({ data: { ...data, position } });
  },
  async update(id: TaskParams["id"], data: UpdateTaskRequest, userId: UserId) {
    const [task] = await prisma.task.updateManyAndReturn({
      where: { id, column: { userId } },
      data,
    });
    if (!task) throw new AppError("TASK_NOT_FOUND");
    return task;
  },
  async move(id: TaskParams["id"], data: MoveTaskRequest, userId: UserId) {
    const { columnId, prevId, nextId } = data;

    const [task, column, prevTask, nextTask] = await Promise.all([
      prisma.task.findFirst({ where: { id, column: { userId } } }),
      prisma.column.findFirst({ where: { id: columnId, userId } }),
      prevId ? prisma.task.findUnique({ where: { id: prevId } }) : null,
      nextId ? prisma.task.findUnique({ where: { id: nextId } }) : null,
    ]);
    if (!task || !column) throw new AppError("TASK_NOT_FOUND");

    const position = calculatePosition(prevTask?.position, nextTask?.position);

    const [moved] = await prisma.task.updateManyAndReturn({
      where: { id },
      data: { columnId, position },
    });
    return moved;
  },
  async delete(id: TaskParams["id"], userId: UserId) {
    const { count } = await prisma.task.deleteMany({
      where: { id, column: { userId } },
    });
    if (count === 0) throw new AppError("TASK_NOT_FOUND");
  },
};
