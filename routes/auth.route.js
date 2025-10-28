import { Router } from "express";
import {
  signInHandler,
  signOutHandler,
  signUpHandler,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpHandler);

authRouter.post("/sign-in", signInHandler);

authRouter.post("/sign-out", signOutHandler);

export default authRouter;
