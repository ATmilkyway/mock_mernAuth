import assert from "node:assert";
import type { AppErrorCode } from "../constants/appErrorCode.js";
import type { HttpStatusCode } from "../constants/http.js";
import { AppError } from "./AppError.js";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode,
) => asserts condition;

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;

// if (!condition) {
//     throw new AppError(httpStatusCode, message, appErrorCode);
//   }
