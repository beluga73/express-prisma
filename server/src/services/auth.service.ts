import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { authUtils } from "@/lib/auth";
import { AppError } from "@/lib/errors";
import type { SignInRequest, SignUpRequest } from "@/schemas/auth.schema";

export const authService = {
  async signUp({ name, email, password }: SignUpRequest) {
    const userId = randomUUID();
    const passwordHash = await authUtils.hashPassword(password);
    const accessToken = authUtils.generateAccessToken(userId);
    const refreshToken = authUtils.generateRefreshToken(userId);

    const user = await prisma.user.create({
      data: { id: userId, name, email, passwordHash, refreshToken },
    });

    return { user, accessToken, refreshToken };
  },
  async signIn({ email, password }: SignInRequest) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("INVALID_CREDENTIALS");
    }

    const { id, passwordHash } = user;

    const same = await authUtils.comparePassword(password, passwordHash);

    if (!same) {
      throw new AppError("INVALID_CREDENTIALS");
    }

    const refreshToken = authUtils.generateRefreshToken(id);
    const accessToken = authUtils.generateAccessToken(id);

    const newUser = await prisma.user.update({
      where: { id },
      data: { refreshToken },
    });

    return { user: newUser, accessToken, refreshToken };
  },
};
