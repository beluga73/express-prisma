import {
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

  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({ user: parsedUser, accessToken });
});

router.post("/sign-in", async (req, res) => {
  const data = SignInRequestSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await authService.signIn(data);
  const parsedUser = safeUserSchema.parse(user);

  res.cookie("token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ user: parsedUser, accessToken });
});

export { router };
