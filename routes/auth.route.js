import { Router } from "express";
import { signUpHandler } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpHandler);

export default authRouter;
