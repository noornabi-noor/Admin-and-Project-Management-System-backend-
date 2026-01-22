import { Request, Response } from "express";
import { inviteServices } from "./invite.services";

 const inviteUser = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  const invite = await inviteServices.createInvite(
    email,
    role,
    req.user!.id
  );

  // email sending simulated
  res.status(201).json({
    success: true,
    inviteLink: `/register?token=${invite.token}`,
  });
};

export const inviteController = {
    inviteUser
}