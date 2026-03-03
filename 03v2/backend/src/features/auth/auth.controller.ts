import type { Request, Response } from "express";
import catchErrors from "../../utils/catchErrors.js";
import { createAccount } from "./auth.service.js";
import { registerSchema } from "./auth.schema.js";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  await createAccount(request);
});
