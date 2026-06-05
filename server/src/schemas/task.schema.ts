import { TasksSchema, ColumnSchema } from "@/generated/zod";
import z from "zod";

export const GetTasksResponseSchema = ColumnSchema.extend({
  tasks: z.array(TasksSchema),
});

export const CreateTaskRequestSchema = TasksSchema.omit({ id: true });
export type CreateTaskRequest = z.output<typeof CreateTaskRequestSchema>;
export const CreateTaskResponseSchema = TasksSchema;
