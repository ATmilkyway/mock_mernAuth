import { Router } from "express";
import { loginHandler, registerHandler } from "./auth.controller.js";


const authRoutes = Router()

// prefix: /auth/v1
authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);


export default authRoutes