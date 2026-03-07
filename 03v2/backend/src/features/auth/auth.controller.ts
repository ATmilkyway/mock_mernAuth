import type { Request, Response } from "express";
import catchErrors from "../../utils/catchErrors.js";
import { createAccount } from "./auth.service.js";
import { registerSchema } from "./auth.schema.js";
import appAssert from "../../utils/appAssert.js";
import { setAutCookies } from "../../utils/cookies.js";
import { CREATED } from "../../constants/http.js";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAutCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({
      message: "User created successfully.",
    });
});
