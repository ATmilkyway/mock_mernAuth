import type { CookieOptions, Response } from "express";
import { fiftyMinutesFromNow, thirtyDayFromNow } from "./date.js";

const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: true,
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fiftyMinutesFromNow(),
});

const getRefreshAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDayFromNow(),
  path: "/auth/refresh",
});
type Params = {
  res: Response;
  accessToken: string;
  refreshToeken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToeken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToeken,getRefreshAccessTokenCookieOptions());
