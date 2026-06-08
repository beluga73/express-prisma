import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import type { NextFunction, Request, Response } from "express";
import { AppError, API_ERRORS, type ApiErrorCode } from "@/lib/errors";

const PRISMA_ERROR_MAP: Record<string, ApiErrorCode> = {
  P2025: "TASK_NOT_FOUND", // Record not found
  P2002: "EMAIL_ALREADY_EXISTS", // Unique constraint violation (only `email` is unique today)
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(err);

  if (err instanceof ZodError) {
    const apiError = API_ERRORS.INVALID_REQUEST;
    return res.status(apiError.status).json({
      code: apiError.code,
      message: apiError.message,
      errors: err.issues,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const errorKey = PRISMA_ERROR_MAP[err.code];
    if (errorKey) {
      const apiError = API_ERRORS[errorKey];
      return res.status(apiError.status).json({
        code: apiError.code,
        message: apiError.message,
      });
    }
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
  }

  console.error(err);
  const serverError = API_ERRORS.INTERNAL_SERVER_ERROR;
  res.status(500).json({
    code: serverError.code,
    message: serverError.message,
  });
};
