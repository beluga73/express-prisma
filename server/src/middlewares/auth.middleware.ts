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

// requireAuth guarantees req.userId is set, but Express's Request type still
// marks it optional since the middleware can't change the type of req for
// later handlers. This narrows it back to string in one place instead of
// `req as AuthenticatedRequest` casts scattered across every route.
export const getUserId = (req: Request): string => {
  if (!req.userId) {
    throw new AppError("UNAUTHORIZED");
  }
  return req.userId;
};
