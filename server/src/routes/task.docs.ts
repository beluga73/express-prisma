import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  GetTasksResponseSchema,
  CreateTaskResponseSchema,
  UpdateTaskRequestSchema,
  TaskParamsSchema,
} from "@/schemas/task.schema";
import {
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} from "./common.docs";

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
      ...INTERNAL_SERVER_ERROR,
    },
  });
  registry.registerPath({
    method: "post",
    path: "/tasks",
    summary: "Create a task",
    request: {
      body: {
        description: "Task data to create",
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
      ...VALIDATION_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });
  registry.registerPath({
    method: "patch",
    path: "/tasks/{id}",
    summary: "Update a task",
    request: {
      params: TaskParamsSchema,
      body: {
        description: "Fields to update",
        content: {
          "application/json": {
            schema: UpdateTaskRequestSchema,
            example: {
              title: "Updated title",
              position: 5,
              columnId: 2,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Task updated successfully",
        content: {
          "application/json": {
            schema: CreateTaskResponseSchema,
            example: {
              id: 1,
              title: "Updated title",
              position: 5,
              columnId: 2,
            },
          },
        },
      },
      ...VALIDATION_ERROR,
      ...NOT_FOUND_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });
  registry.registerPath({
    method: "delete",
    path: "/tasks/{id}",
    summary: "Delete a task",
    request: {
      params: TaskParamsSchema,
    },
    responses: {
      200: {
        description: "Task deleted successfully",
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
      ...NOT_FOUND_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });
};
