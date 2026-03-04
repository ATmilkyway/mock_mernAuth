import type { ErrorRequestHandler, Response } from "express";
import z from "zod";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { AppError } from "../utils/AppError.js";

const handleZodError = (res: Response, error: z.ZodError) => {
  const formattedErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".");
    formattedErrors[key] = issue.message;
  }

  return res.status(400).json({
    message: "Validation failed",
    errors: formattedErrors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);
  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }
  if (error instanceof AppError) return handleAppError(res, error);
  return res.status(INTERNAL_SERVER_ERROR).send("Internal server error.");
};

export default errorHandler;
