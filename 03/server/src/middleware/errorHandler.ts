import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/constants/http.js";
import AppError from "@/utils/AppError.js";
import { clearAuthCookies, REFRESH_PATH } from "@/utils/cookies.js";
import type { ErrorRequestHandler, Response } from "express";
import z from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};
const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  console.log(`PATH: ${req.path}`, error);
  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }
  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) return handleAppError(res, error);
  return res.status(INTERNAL_SERVER_ERROR).send("Internal server error.");
};

export default errorHandler;
