import { TasksSchema, ColumnSchema } from "@/generated/zod";
import z from "zod";
import { idParamSchema } from "./common.schema";

export const TaskParamsSchema = idParamSchema;
export type TaskParams = z.output<typeof TaskParamsSchema>;

export const GetTasksResponseSchema = ColumnSchema.extend({
  tasks: z.array(TasksSchema),
});

export const UpdateTaskRequestSchema = TasksSchema.omit({ id: true }).partial();
export type UpdateTasksResponse = z.output<typeof UpdateTaskRequestSchema>;

export const CreateTaskRequestSchema = TasksSchema.omit({ id: true });
export type CreateTaskRequest = z.output<typeof CreateTaskRequestSchema>;
export const CreateTaskResponseSchema = TasksSchema;
