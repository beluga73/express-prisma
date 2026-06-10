import {
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/constants/auth";
import { AppError } from "@/lib/errors";
import {
  RefreshRequestSchema,
  safeUserSchema,
  SignInRequestSchema,
  SignUpRequestSchema,
} from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { requireAuth, getUserId } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const data = SignUpRequestSchema.parse(req.body);

  const { user, accessToken, refreshToken } = await authService.signUp(data);
  const parsedUser = safeUserSchema.parse(user);

  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
  res.status(201).json({ user: parsedUser, accessToken });
});

router.post("/sign-in", async (req, res) => {
  const data = SignInRequestSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await authService.signIn(data);
  const parsedUser = safeUserSchema.parse(user);

  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
  res.status(200).json({ user: parsedUser, accessToken });
});

router.post("/logout", requireAuth, async (req, res) => {
  const userId = getUserId(req);
  await authService.logout(userId);
  res.clearCookie(REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE_OPTIONS);
  res.status(204).send();
});

router.get("/me", requireAuth, async (req, res) => {
  const userId = getUserId(req);
  const user = await authService.me(userId);
  const parsedUser = safeUserSchema.parse(user);

  res.json(parsedUser);
});

router.post("/refresh", async (req, res) => {
  // use safeParse not to show zod error if validation fails
  const { success, data } = RefreshRequestSchema.safeParse(req.signedCookies);
  if (!success) {
    throw new AppError("FORBIDDEN");
  }

  const { user, accessToken } = await authService.refresh(data);
  const parsedUser = safeUserSchema.parse(user);

  res.json({ user: parsedUser, accessToken });
});

export { router };
