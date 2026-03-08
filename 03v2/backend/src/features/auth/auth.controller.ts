import { CREATED } from "../../constants/http.js";
import catchErrors from "../../utils/catchErrors.js";
import { setAutCookies } from "../../utils/cookies.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { createAccount, loginUser } from "./auth.service.js";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // response
  return setAutCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({
      message: "User created successfully.",
    });
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { accessToken, refreshToken } = await loginUser(request);

  return setAutCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json({
      message: "Logged in successfully.",
    });
});
