export const REFRESH_TOKEN_COOKIE = "refreshToken";

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  signed: true,
  sameSite: "strict" as const,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
