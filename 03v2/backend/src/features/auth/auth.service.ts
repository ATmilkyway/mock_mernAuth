import { AppErrorCode } from "../../constants/appErrorCode.js";
import { BAD_REQUEST, CONFLICT } from "../../constants/http.js";
import appAssert from "../../utils/appAssert.js";
import UserModel from "../users/user.model.js";

export type createAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: createAccountParams) => {
  const { email, password, userAgent } = data;
  // check if the user exist
  const existingUser = await UserModel.findOne({ email });

  appAssert(
    !existingUser,
    CONFLICT,
    "Email already in use",
    AppErrorCode.EMAIL_ALREADY_EXISTS,
  );

  const newUser = await UserModel.create({
    email: email,
    password: password,
  });
  // hash the password
  // create new user
  // generate access and refresh token
  // return user and token
  return {
    user: newUser,
  };
};
