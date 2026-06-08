import { UserSchema } from "@/generated/zod";
import z from "zod";

export const safeUserSchema = UserSchema.omit({
  passwordHash: true,
  refreshToken: true,
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password cannot exceed 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const SignUpRequestSchema = UserSchema.pick({
  name: true,
  email: true,
}).extend({ password: passwordSchema });
export type SignUpRequest = z.output<typeof SignUpRequestSchema>;

export const SignInRequestSchema = UserSchema.pick({ email: true }).extend({
  password: passwordSchema,
});
export type SignInRequest = z.output<typeof SignInRequestSchema>;

export const AuthResponseSchema = z.object({
  user: safeUserSchema,
  accessToken: z.string(),
});
export type AuthResponse = z.output<typeof AuthResponseSchema>;
