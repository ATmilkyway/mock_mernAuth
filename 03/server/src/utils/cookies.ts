import type { CookieOptions, Response } from "express";
import { fiftyMinutesFromNow, thirtyDaysFromNow,   } from "./date.js";

export const REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: true,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fiftyMinutesFromNow(),
});

export const getRefreshAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});
type Params = {
  res: Response;
  accessToken: string;
  refreshToeken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToeken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie(
      "refreshToken",
      refreshToeken,
      getRefreshAccessTokenCookieOptions(),
    );

export const clearAuthCookies = (res: Response) => {
 return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });
};
