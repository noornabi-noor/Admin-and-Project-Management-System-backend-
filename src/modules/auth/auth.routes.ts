import { Router } from "express";
import { authController } from "./auth.controller";



const router = Router();

router.post("/register-via-invite", authController.registerViaInvite);

export const authRoutes = router;
