import { Router } from "express";
import { registerHandler } from "./auth.controller.js";


const authRoutes = Router()

// prefix: /auth/v1
authRoutes.post('/user',registerHandler)


export default authRoutes