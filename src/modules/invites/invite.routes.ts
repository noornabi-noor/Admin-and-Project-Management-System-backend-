import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { inviteController } from "./invite.controller";

const router = Router();

router.post("/invite", auth(UserRole.ADMIN), inviteController.inviteUser);

router.get("/health", (_req, res) => {
  res.json({ invite: "ok" });
});


export const inviteRoutes = router;
