import { authUtils } from "@/lib/auth";
import { AppError } from "@/lib/errors";
import type { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("UNAUTHORIZED");
  }

  const accessToken = authHeader.split(" ")[1] ?? "";

  let userId: string;
  try {
    ({ userId } = authUtils.verifyAccessToken(accessToken));
  } catch {
    throw new AppError("UNAUTHORIZED");
  }

  req.userId = userId;

  next();
};
