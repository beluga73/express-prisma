import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const authUtils = {
  // --- Password Hashing ---
  hashPassword: async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10); // 10 salt rounds is the secure industry standard
  },

  comparePassword: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  },

  // --- JWT Generation ---
  generateAccessToken: (userId: string): string => {
    return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
  },

  generateRefreshToken: (userId: string): string => {
    return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
  },

  // --- JWT Verification ---
  verifyAccessToken: (token: string) => {
    return jwt.verify(token, ACCESS_SECRET) as { userId: string };
  },

  verifyRefreshToken: (token: string) => {
    return jwt.verify(token, REFRESH_SECRET) as { userId: string };
  },
};
