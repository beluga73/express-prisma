import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  SignUpRequestSchema,
  SignInRequestSchema,
  AuthResponseSchema,
} from "@/schemas/auth.schema";
import {
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../common.docs";

export const registerAuthDocs = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/auth/sign-up",
    summary: "Create an account",
    request: {
      body: {
        description: "Account details",
        content: {
          "application/json": {
            schema: SignUpRequestSchema,
            example: {
              name: "Jane Doe",
              email: "jane@example.com",
              password: "Sup3r$ecret",
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Account created successfully",
        content: {
          "application/json": {
            schema: AuthResponseSchema,
          },
        },
      },
      ...VALIDATION_ERROR,
      ...CONFLICT_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });

  registry.registerPath({
    method: "post",
    path: "/auth/sign-in",
    summary: "Sign in to an existing account",
    request: {
      body: {
        description: "Credentials",
        content: {
          "application/json": {
            schema: SignInRequestSchema,
            example: {
              email: "jane@example.com",
              password: "Sup3r$ecret",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Signed in successfully",
        content: {
          "application/json": {
            schema: AuthResponseSchema,
          },
        },
      },
      ...VALIDATION_ERROR,
      ...UNAUTHORIZED_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });
};
