import { Request, Response } from "express";
import { userServices } from "./user.services";

const listUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = 10;

  const users = await userServices.getUsers((page - 1) * limit, limit);

  res.json(users);
};

const changeRole = async (req: Request, res: Response) => {
  const user = await userServices.updateUserRole(
    req.params.id as string,
    req.body.role,
  );
  res.json(user);
};

const changeStatus = async (req: Request, res: Response) => {
  const user = await userServices.updateUserStatus(
    req.params.id as string,
    req.body.status,
  );
  res.json(user);
};

export const userController = {
  listUsers,
  changeRole,
  changeStatus,
};
