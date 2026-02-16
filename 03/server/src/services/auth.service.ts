import { JWT_REFRESH_SECRET, JWT_SECRET } from "@/constants/env.js";
import { CONFLICT, OK, UNAUTHORIZED } from "@/constants/http.js";
import verificationCodeType from "@/constants/verificationCodeType.js";
import SessionModel from "@/models/session.model.js";
import UserModel from "@/models/user.model.js";
import VerificationCodeModel from "@/models/verificationCode.model.js";
import appAssert from "@/utils/appAssert.js";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from "@/utils/date.js";
import {
  refreshTokenSignOption,
  signToken,
  verifyToken,
  type RefreshTokenPayload,
} from "@/utils/jwt.js";
import jwt from "jsonwebtoken";

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

  const userId = user._id;
  // create verification token
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: verificationCodeType.EmailVerification,
    expireAt: oneYearFromNow(),
  });

  // send verification email
  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });
  // sign accesss token & refresh token
  const refreshToeken = signToken({ sessionId: session._id });
  // access tokens
  const accessToken = signToken({ userId, sessionId: session._id });
  // return user &  tokens

  return { user: user.omitPassword(), accessToken, refreshToeken };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  // get the user by email
  const user = await UserModel.findOne({ email }).select("+password");

  appAssert(user, UNAUTHORIZED, "Invalid email or password");
  // validate the password from the request
  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");
  const userId = user._id;
  // create session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = { sessionId: session._id };
  // sign access token & refresh token
  const refreshToeken = signToken(sessionInfo, refreshTokenSignOption);
  // access tokens
  const accessToken = signToken({
    ...sessionInfo,
    userId: user._id,
  });
  // return & user
  return { user: user.omitPassword(), accessToken, refreshToeken };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload, error } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOption.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    // the background task that removes expired documents via a TTL index runs every 60 seconds by default. so addingn this will improve it
    UNAUTHORIZED,
    "Session expired.",
  );

  // refresh the session if it expire in 24hr
  const sessionNeedRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
  if (sessionNeedRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }
  const newRefreshToken = sessionNeedRefresh
    ? signToken(
        {
          sessionId: session._id,
        },
        refreshTokenSignOption,
      )
    : undefined;
  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};
