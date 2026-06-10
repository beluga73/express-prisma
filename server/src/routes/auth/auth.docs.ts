import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  SignUpRequestSchema,
  SignUpResponseSchema,
  SignInRequestSchema,
  SignInResponseSchema,
  RefreshResponseSchema,
  MeResponseSchema,
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
            schema: SignUpResponseSchema,
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
            schema: SignInResponseSchema,
          },
        },
      },
      ...VALIDATION_ERROR,
      ...UNAUTHORIZED_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/auth/me",
    summary: "Get the current user",
    description: "Returns the authenticated user. Requires a valid access token.",
    request: {},
    responses: {
      200: {
        description: "Current user",
        content: {
          "application/json": {
            schema: MeResponseSchema,
          },
        },
      },
      ...UNAUTHORIZED_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });

  registry.registerPath({
    method: "post",
    path: "/auth/refresh",
    summary: "Refresh access token",
    description: "Reads the refresh token from the signed httpOnly cookie set at sign-in.",
    request: {},
    responses: {
      200: {
        description: "New access token issued",
        content: {
          "application/json": {
            schema: RefreshResponseSchema,
          },
        },
      },
      ...UNAUTHORIZED_ERROR,
      ...INTERNAL_SERVER_ERROR,
    },
  });

  registry.registerPath({
    method: "post",
    path: "/auth/logout",
    summary: "Log out",
    request: {},
    responses: {
      204: {
        description: "Logged out successfully",
        content: {},
      },
      ...INTERNAL_SERVER_ERROR,
    },
  });
};
