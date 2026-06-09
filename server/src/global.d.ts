declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }

  type AuthenticatedRequest = import("express").Request & { userId: string };
}

export {};
