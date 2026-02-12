import z, { email } from "zod";
import catchErrors from "../utils/catchErrors.js";
import { createAccount } from "../services/auth.service.js";
import { CREATED } from "../constants/http.js";

const registerSchema = z
  .object({
    email: z.email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(async (req, res) => {
  // validate request

  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // call serveice
  const { user, accessToken, refreshToeken } = await createAccount(request);
  // return response
  return res.status(CREATED).json(user)
});
