import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  GetTasksResponseSchema,
  CreateTaskRequestSchema,
  CreateTaskResponseSchema,
  UpdateTaskRequestSchema,
  MoveTaskRequestSchema,
  TaskParamsSchema,
} from "@/schemas/task.schema";
import {
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../common.docs";

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
            schema: CreateTaskRequestSchema,
            example: {
              title: "Fix login bug",
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
              position: "0|10000:",
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
    summary: "Update a task's fields (e.g. title)",
    request: {
      params: TaskParamsSchema,
      body: {
        description: "Fields to update",
        content: {
          "application/json": {
            schema: UpdateTaskRequestSchema,
            example: {
              title: "Updated title",
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
              position: "0|10000:",
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
    method: "patch",
    path: "/tasks/{id}/move",
    summary: "Move a task to another column and/or position",
    description:
      "Recalculates the task's position based on the tasks it should end up between. " +
      "Omit prevId/nextId when the task is dropped at the start/end of the column or into an empty column.",
    request: {
      params: TaskParamsSchema,
      body: {
        description: "Target column and surrounding tasks",
        content: {
          "application/json": {
            schema: MoveTaskRequestSchema,
            example: {
              columnId: 2,
              prevId: 4,
              nextId: 7,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Task moved successfully",
        content: {
          "application/json": {
            schema: CreateTaskResponseSchema,
            example: {
              id: 1,
              title: "Updated title",
              position: "0|10000:",
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
      204: {
        description: "Task deleted successfully",
        content: {},
      },
      ...NOT_FOUND_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });
};
