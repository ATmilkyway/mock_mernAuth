import type { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env.js";
import { fiftyMinutesFromNow, thirtyDaysFromNow } from "./date.js";

export const REFRESH_PATH = "/auth/refresh";

const defaults: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV !== "development",
  sameSite: NODE_ENV === "development" ? "lax" : "strict",
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fiftyMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});
type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const setAutCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
