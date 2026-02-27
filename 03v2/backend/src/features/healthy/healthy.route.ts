import Router    from "express";
import healthyHandler from "./healthy.controller.js";

const healthCheckRoutes = Router();

// prefix: /healthCheck
healthCheckRoutes.get("/", healthyHandler);

export default healthCheckRoutes;
