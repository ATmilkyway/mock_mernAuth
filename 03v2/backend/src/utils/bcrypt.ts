import bcrypt from "bcrypt";
export const hashValue = async (
  value: string,
  saltRound?: number,
): Promise<string> => {
  return bcrypt.hash(value, saltRound || 10);
};
