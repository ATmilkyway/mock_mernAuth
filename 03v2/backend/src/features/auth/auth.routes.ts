import { Router } from "express";
import { registerHandler } from "./auth.controller.js";


const authRoutes = Router()

// prefix: /auth/v1
authRoutes.post('/register',registerHandler)


export default authRoutes