import API from "@/config/apiClient";
import { LoginResponse, loginSchema } from "@/schemas/loginSchema";
import * as z from "zod";

export const login = async (data: z.infer<typeof loginSchema>): Promise<LoginResponse> => {
  return API.post("/auth/login", data);
};
