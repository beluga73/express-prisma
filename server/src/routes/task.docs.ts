import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createTaskSchema } from "../schemas/task.schema.js";
import z from "zod";

/**
 * This is horrible, you have to generate schema from prisma tables
 * and then create Request & Reponse schema from them
 */

const taskResponseSchema = createTaskSchema.extend({
  id: z.number(),
});

const boardResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    position: z.number(),
    tasks: z.array(taskResponseSchema),
  }),
);

export const registerTaskDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/tasks",
    // summary: "get all tasks",
    request: {},
    responses: {
      200: {
        description: "Returns all tasks",
        content: {
          "application/json": {
            schema: boardResponseSchema,
          },
        },
      },
    },
  });
  registry.registerPath({
    method: "post",
    path: "/tasks",
    request: {
      body: {
        content: {
          "application/json": {
            schema: createTaskSchema,
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
      201: { description: "Task created successfully" },
    },
  });
};
