import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { projectController } from "./project.controller";


const router = Router();

router.post("/", auth(), projectController.create);
router.get("/", auth(), projectController.list);
router.patch("/:id", auth(UserRole.ADMIN), projectController.update);
router.delete("/:id", auth(UserRole.ADMIN), projectController.remove);

export const projectRoutes = router;
