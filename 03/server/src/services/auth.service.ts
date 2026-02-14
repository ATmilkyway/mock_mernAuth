import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js";
import verificationCodeType from "../constants/verificationCodeType.js";
import SessionModel from "../models/session.model.js";
import UserModel from "../models/user.model.js";
import VerificationCodeModel from "../models/verificationCode.model.js";
import { oneYearFromNow } from "../utils/date.js";
import appAssert from "../utils/appAssert.js";
import { CONFLICT } from "../constants/http.js";

export type createAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: createAccountParams) => {
  // verify existing user doesnt exist
  const existingUser = await UserModel.exists({
    email: data.email,
  });

  // if (existingUser) {
  //   throw new Error("User already exists.");
  // }

  appAssert(!existingUser, CONFLICT, "Email already in use");

  // create the user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });
  // create verification token
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: verificationCodeType.EmailVerification,
    expireAt: oneYearFromNow(),
  });

  // send verification email
  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });
  // sign accesss token & refresh token
  const refreshToeken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    {
      audience: ["user"],
      expiresIn: "30d",
    },
  );
  // access tokens
  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    {
      audience: ["user"],
      expiresIn: "15m",
    },
  );
  // return user &  tokens

  return { user:user.omitPassword(), accessToken, refreshToeken };
};
