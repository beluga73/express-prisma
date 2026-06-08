export const API_ERRORS = {
  INVALID_REQUEST: {
    status: 400,
    code: "INVALID_REQUEST",
    message: "Invalid request",
  },
  UNAUTHORIZED: {
    status: 401,
    code: "UNAUTHORIZED",
    message: "Session expired",
  },
  FORBIDDEN: {
    status: 403,
    code: "FORBIDDEN",
    message: "Access denied",
  },
  TASK_NOT_FOUND: {
    status: 404,
    code: "TASK_NOT_FOUND",
    message: "Task not found",
  },
  INVALID_CREDENTIALS: {
    status: 401,
    code: "INVALID_CREDENTIALS",
    message: "Invalid email or password",
  },
  EMAIL_ALREADY_EXISTS: {
    status: 409,
    code: "EMAIL_ALREADY_EXISTS",
    message: "An account with this email already exists",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  },
} as const;

export type ApiErrorCode = keyof typeof API_ERRORS;

export class AppError extends Error {
  public readonly status: number;
  public readonly code: ApiErrorCode;

  constructor(errorKey: ApiErrorCode, message?: string) {
    const config = API_ERRORS[errorKey];
    super(message || config.message);
    this.status = config.status;
    this.code = config.code;
    this.name = "AppError";
  }
}
