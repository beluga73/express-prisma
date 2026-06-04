import { ZodError } from "zod";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(err);

  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.issues });
  }

  console.error(err);
  res.status(err.status ?? 500).json({
    errors: [{ message: err.message ?? "Internal server error" }],
  });
};
