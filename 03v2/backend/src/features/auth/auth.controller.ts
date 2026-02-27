import type { Request, Response } from "express";

export const registerHandler = (req: Request, res: Response): Response => {
  try {
    return res.status(200).json({
      message: "auth",
    });
  } catch (error) {
    return res.status(200).json({
      message: "auth",
    });
  }
};
