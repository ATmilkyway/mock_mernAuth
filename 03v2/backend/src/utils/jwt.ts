import jwt, { type SignOptions } from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../constants/env.js";
import type { SessionDocument } from "../features/auth/session.model.js";
import type { UserDocument } from "../features/users/user.model.js";

type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

export const accessTokenSignOption: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_ACCESS_SECRET,
};

export const refreshTokenSignOption: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret,
): string => {
  const { secret, ...signOption } = options || accessTokenSignOption;
  return jwt.sign(payload, secret, { ...defaults, ...signOption });
};
