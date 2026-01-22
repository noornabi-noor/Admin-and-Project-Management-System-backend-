import { Request, Response, NextFunction } from "express";
import { authServices } from "./auth.services";

const registerViaInvite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token, name, password } = req.body;

    await authServices.registerViaInviteService(token, name, password);

    res.status(201).json({ success: true });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  registerViaInvite,
};
