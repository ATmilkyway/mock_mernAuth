import { JWT_REFRESH_SECRET, JWT_SECRET } from "@/constants/env.js";
import type { SessionDocument } from "@/models/session.model.js";
import type { UserDocument } from "@/models/user.model.js";
import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

const verifyDefaults: VerifyOptions = {
  audience: ["user"], // This is actually a tuple, not string[]!
  // In TypeScript, ["user"] is inferred as a tuple, not a string[]
};

const accessTokenSignOption: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshToekenSignOption: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: RefreshTokenPayload | AccessTokenPayload,
  options?: SignOptionsAndSecret,
) => {
  const { secret, ...signOption } = options || accessTokenSignOption;
  return jwt.sign(payload, secret, { ...defaults, ...signOption });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & {
    secret?: string;
  },
) => {
  const { secret = JWT_SECRET, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...verifyDefaults,
      ...verifyOpts,
    }) as TPayload;
    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
