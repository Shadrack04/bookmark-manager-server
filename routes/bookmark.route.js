import { Router } from "express";

const bookmarkRouter = Router();

bookmarkRouter.get("/", (req, res) => res.send("get all bookmarks"));

export default bookmarkRouter;
