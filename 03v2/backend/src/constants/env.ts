const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) throw new Error(`Missing env variable  ${key}`);
  return value;
};

export const PORT = getEnv("PORT", "4004");
export const NODE_ENV = getEnv("NODE_ENV");
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");


 