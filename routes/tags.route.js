import { Router } from "express";
import { getAllTags } from "../controllers/tag.controller.js";

const tagRouter = Router();

tagRouter.get("/", getAllTags);

export default tagRouter;
