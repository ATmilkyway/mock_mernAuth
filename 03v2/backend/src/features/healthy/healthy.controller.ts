import type { Request, Response } from "express";

const healthyHandler = (req: Request, res: Response): Response =>
  res.status(200).json({
    status: "UP",
    message: "Healthy!",
    timestamp: new Date().toLocaleTimeString(),
  });

export default healthyHandler;
