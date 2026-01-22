import express, { Request, Response } from "express"
import { toNodeHandler } from "better-auth/node";
import cors from "cors"
import { auth } from "./lib/auth"
import { inviteRoutes } from "./modules/invites/invite.routes";
import { userRoutes } from "./modules/users/user.routes";
import { projectRoutes } from "./modules/projects/project.routes";
import { authRoutes } from "./modules/auth/auth.routes";



const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.APP_URL
}))

// better auth 
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/invite-auth", authRoutes);

// api check
app.use("/api/invites", inviteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req : Request, res: Response)=>{
    res.send("Hello world!");
});

export default app;