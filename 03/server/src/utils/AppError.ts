import type AppErrorCode from "../constants/appErrorCode.js";
import type { HttpStatusCode } from "../constants/http.js";

export class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    message: string,
    public errorCode?: AppErrorCode,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
