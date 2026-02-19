import { getUserHandler } from "../controllers/user.controller.js";
import { Router } from "express";

const userRoutes = Router();

// prefix:  /user
userRoutes.get("/", getUserHandler);

export default userRoutes;
