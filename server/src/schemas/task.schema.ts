import { TasksSchema, ColumnSchema } from "@/generated/zod";
import z from "zod";
import { idParamSchema } from "./common.schema";

export const TaskParamsSchema = idParamSchema;
export type TaskParams = z.output<typeof TaskParamsSchema>;

export const GetTasksResponseSchema = z.array(
  ColumnSchema.extend({
    tasks: z.array(TasksSchema),
  }),
);

export const CreateTaskRequestSchema = TasksSchema.omit({
  id: true,
  position: true,
});
export type CreateTaskRequest = z.output<typeof CreateTaskRequestSchema>;
export const CreateTaskResponseSchema = TasksSchema.openapi("Task");

export const UpdateTaskRequestSchema = TasksSchema.pick({ title: true });
export type UpdateTaskRequest = z.output<typeof UpdateTaskRequestSchema>;

export const MoveTaskRequestSchema = z.object({
  columnId: z.coerce.number().int().positive(),
  prevId: z.coerce.number().int().positive().nullish(),
  nextId: z.coerce.number().int().positive().nullish(),
});
export type MoveTaskRequest = z.output<typeof MoveTaskRequestSchema>;

export const ValidationErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  errors: z.array(
    z.object({
      code: z.string(),
      message: z.string(),
      path: z.array(z.union([z.string(), z.number()])).optional(),
    }),
  ),
});

export const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});
