export type createAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};
const createAccount = async (data: createAccountParams) => {
    // verify existing user doesnt exist
    // create the user
    // create a verification token
    // send verification code
};
