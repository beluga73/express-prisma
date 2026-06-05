import { TasksSchema, ColumnSchema } from "@/generated/zod";
import z from "zod";
import { idParamSchema } from "./common.schema";

export const TaskParamsSchema = idParamSchema;
export type TaskParams = z.output<typeof TaskParamsSchema>;

export const GetTasksResponseSchema = z.array(
  ColumnSchema.extend({
    tasks: z.array(TasksSchema),
  })
);

export const UpdateTaskRequestSchema = TasksSchema.omit({ id: true }).partial();
export type UpdateTasksResponse = z.output<typeof UpdateTaskRequestSchema>;

export const CreateTaskRequestSchema = TasksSchema.omit({ id: true });
export type CreateTaskRequest = z.output<typeof CreateTaskRequestSchema>;
export const CreateTaskResponseSchema = TasksSchema;

export const ValidationErrorSchema = z.object({
  errors: z.array(z.object({
    code: z.string(),
    message: z.string(),
    path: z.array(z.union([z.string(), z.number()])).optional(),
  })),
});

export const GenericErrorSchema = z.object({
  errors: z.array(z.object({
    message: z.string(),
  })),
});
