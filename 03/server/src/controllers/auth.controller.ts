import { CREATED, OK, UNAUTHORIZED } from "@/constants/http.js";
import SessionModel from "@/models/session.model.js";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordEmail,
  verifyEmail,
} from "@/services/auth.service.js";
import appAssert from "@/utils/appAssert.js";
import catchErrors from "@/utils/catchErrors.js";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshAccessTokenCookieOptions,
  setAuthCookies,
} from "@/utils/cookies.js";
import { verifyToken } from "@/utils/jwt.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "./auth.schama.js";
export const registerHandler = catchErrors(async (req, res) => {
  // validate request

  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // call serveice
  const { user, accessToken, refreshToeken } = await createAccount(request);
  // return response

  return setAuthCookies({ res, accessToken, refreshToeken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // call serveice
  const { accessToken, refreshToeken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToeken })
    .status(OK)
    .json({ message: "Login successfull" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies["accessToken"] as string | undefined;
  const { payload } = verifyToken(accessToken || "");
  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout successfull",
  });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies["refreshToken"] as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token.");

  // call service
  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie(
      "refreshToken",
      newRefreshToken,
      getRefreshAccessTokenCookieOptions(),
    );
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({
      message: "Access token refreshed",
    });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params["code"]);
  // call service
  await verifyEmail(verificationCode);
  return res.status(OK).json({
    message: "Email was successfully verified",
  });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  // call service
  await sendPasswordEmail(email);
  return res.status(OK).json({
    message: "Password reset email sent.",
  });
});

export const resetPasswordResetHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);
  await resetPassword(request);
  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successful",
  });
});
