import { AppErrorCode } from "../../constants/appErrorCode.js";
import {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} from "../../constants/http.js";
import appAssert from "../../utils/appAssert.js";
import { thirtyDaysFromNow } from "../../utils/date.js";
import UserModel from "../users/user.model.js";
import VerificationCodeType from "./auth.types.js";
import SessionModel from "./session.model.js";
import VerificationCodeModel from "./verificationCode.model.js";

export type createAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: createAccountParams) => {
  // check if the user exist
  const existingUser = await UserModel.findOne({ email: data.email });

  appAssert(
    !existingUser,
    CONFLICT,
    "Email already in use",
    AppErrorCode.EMAIL_ALREADY_EXISTS,
  );

  // create new user
  const newUser = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const userId = newUser._id;
  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: thirtyDaysFromNow(),
  });

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });
  // generate access and refresh token

  // return user and token
  return {
    user: newUser.omitPassword(),
  };
};
