import { CREATED, OK } from "@/constants/http.js";
import { createAccount, loginUser } from "@/services/auth.service.js";
import AppError from "@/utils/AppError.js";
import catchErrors from "@/utils/catchErrors.js";
import { clearAuthCookies, setAuthCookies } from "@/utils/cookies.js";
import z from "zod";
import { loginSchema, registerSchema } from "./auth.schama.js";
import { verifyToken } from "@/utils/jwt.js";
import SessionModel from "@/models/session.model.js";

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
  const { accessToken, refreshToeken, user } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToeken })
    .status(OK)
    .json({ message: "Login successfull" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload, error } = verifyToken(accessToken);
  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout successfull",
  });
});
