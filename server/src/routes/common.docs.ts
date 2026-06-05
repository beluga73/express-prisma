import { GenericErrorSchema, ValidationErrorSchema } from "@/schemas/task.schema";

export const VALIDATION_ERROR = {
  400: {
    description: "Invalid request body",
    content: {
      "application/json": {
        schema: ValidationErrorSchema,
      },
    },
  },
};

export const NOT_FOUND_ERROR = {
  404: {
    description: "Resource not found",
    content: {
      "application/json": {
        schema: GenericErrorSchema,
      },
    },
  },
};

export const INTERNAL_SERVER_ERROR = {
  500: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: GenericErrorSchema,
      },
    },
  },
};
