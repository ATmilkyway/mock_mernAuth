import { loginHandler, logoutHandler, registerHandler } from "@/controllers/auth.controller.js";
import { Router } from "express"; 

const authRoutes = Router();

// prefix: /auth
authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/logout", logoutHandler);

export default authRoutes;
