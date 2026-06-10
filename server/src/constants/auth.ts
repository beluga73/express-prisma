export const REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export const REFRESH_TOKEN_COOKIE = "refreshToken";

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  signed: true,
  sameSite: "strict" as const,
  maxAge: REFRESH_TOKEN_TTL_SECONDS * 1000,
};
