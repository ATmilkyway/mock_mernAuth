import { getSessionHandler } from "@/controllers/session.controller.js";
import { Router } from "express";

const sessionRoutes = Router()
// prefix /session
sessionRoutes.get("/", getSessionHandler)

export default sessionRoutes