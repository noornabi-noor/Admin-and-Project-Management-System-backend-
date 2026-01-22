import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { userController } from "./user.controller";


const router = Router();

router.get("/", auth(UserRole.ADMIN), userController.listUsers);
router.patch("/:id/role", auth(UserRole.ADMIN), userController.changeRole);
router.patch("/:id/status", auth(UserRole.ADMIN), userController.changeStatus);

export const userRoutes = router;
