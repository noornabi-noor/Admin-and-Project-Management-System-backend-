import express, { Request, Response } from "express"
import { toNodeHandler } from "better-auth/node";
import cors from "cors"
import { auth } from "./lib/auth";


const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.APP_URL
}))

// better auth 
app.all("/api/auth/*splat", toNodeHandler(auth));



app.get("/", (req : Request, res: Response)=>{
    res.send("Hello world!");
});

export default app;