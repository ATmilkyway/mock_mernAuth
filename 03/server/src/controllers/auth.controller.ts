import { CREATED, OK } from "@/constants/http.js";
import { createAccount, loginUser } from "@/services/auth.service.js";
import AppError from "@/utils/AppError.js";
import catchErrors from "@/utils/catchErrors.js";
import { setAuthCookies } from "@/utils/cookies.js";
import z from "zod";
import { loginSchema, registerSchema } from "./auth.schama.js";

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
