export type ErrorStrategy = "toast" | "silent";

export type ErrorDefinition = {
  message: string;
  strategy: ErrorStrategy;
};

// Codes mirror server/src/lib/errors.ts plus client-only codes (e.g. NETWORK_ERROR).
export const ERRORS = {
  INVALID_REQUEST: {
    message: "Invalid request",
    strategy: "toast",
  },
  UNAUTHORIZED: {
    message: "Session expired",
    strategy: "toast",
  },
  FORBIDDEN: {
    message: "Access denied",
    strategy: "toast",
  },
  TASK_NOT_FOUND: {
    message: "Task not found",
    strategy: "toast",
  },
  EMAIL_ALREADY_EXISTS: {
    message: "An account with this email already exists",
    // shown inline on the sign-up form's email field instead
    strategy: "silent",
  },
  INVALID_CREDENTIALS: {
    message: "Invalid email or password",
    // shown inline on the sign-in form instead
    strategy: "silent",
  },
  INTERNAL_SERVER_ERROR: {
    message: "Something went wrong on our end",
    strategy: "toast",
  },
  NETWORK_ERROR: {
    message: "Network connection failed",
    strategy: "toast",
  },
  UNKNOWN_ERROR: {
    message: "Something went wrong",
    strategy: "toast",
  },
} as const satisfies Record<string, ErrorDefinition>;

export type KnownErrorCode = keyof typeof ERRORS;
