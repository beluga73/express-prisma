import {
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "@/constants/auth";
import { AppError } from "@/lib/errors";
import {
  RequestRefreshSchema,
  safeUserSchema,
  SignInRequestSchema,
  SignUpRequestSchema,
} from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
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

router.post("/logout", async (req, res) => {
  res.clearCookie(REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE_OPTIONS);
  res.status(204).send();
});

router.post("/refresh", async (req, res) => {
  // use safeParse not to show zod error if validation fails
  const { success, data } = RequestRefreshSchema.safeParse(req.signedCookies);
  if (!success) {
    throw new AppError("FORBIDDEN");
  }

  const accessToken = await authService.refresh(data);

  res.json({ accessToken });
});

export { router };
