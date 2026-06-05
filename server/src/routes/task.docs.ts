import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  GetTasksResponseSchema,
  CreateTaskResponseSchema,
} from "@/schemas/task.schema";

export const registerTaskDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/tasks",
    summary: "Get all tasks",
    request: {},
    responses: {
      200: {
        description: "Returns all tasks",
        content: {
          "application/json": {
            schema: GetTasksResponseSchema,
          },
        },
      },
    },
  });
  registry.registerPath({
    method: "post",
    path: "/tasks",
    summary: "Create a task",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateTaskResponseSchema,
            example: {
              title: "Fix login bug",
              position: 0,
              columnId: 1,
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Task created successfully",
        content: {
          "application/json": {
            schema: CreateTaskResponseSchema,
            example: {
              id: 1,
              title: "Fix login bug",
              position: 0,
              columnId: 1,
            },
          },
        },
      },
    },
  });
};
