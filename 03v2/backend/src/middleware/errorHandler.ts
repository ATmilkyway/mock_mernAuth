import type { ErrorRequestHandler } from "express";
import { error } from "node:console";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);
};

export default errorHandler;
