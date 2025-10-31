import { Router } from "express";
import * as bookmarkController from "../controllers/bookmark.controller.js";

const bookmarkRouter = Router();

bookmarkRouter.get("/", bookmarkController.getAllBookmarks);
bookmarkRouter.post("/", bookmarkController.createBookmark);
bookmarkRouter.get("/:id", bookmarkController.getBookmarkById);
bookmarkRouter.put("/:id", bookmarkController.updateBookmarkById);
bookmarkRouter.patch("/:id/view", bookmarkController.updateVisitCount);

bookmarkRouter.delete("/:id", (req, res) => res.send("delete a bookmark"));

bookmarkRouter.post("/:id/archive", (req, res) =>
  res.send("archive a bookmark")
);
bookmarkRouter.post("/:id/unarchive", (req, res) =>
  res.send("unarchive a bookmark")
);
bookmarkRouter.post("/:id/pin", (req, res) => res.send("pin a bookmark"));
bookmarkRouter.post("/:id/unpin", (req, res) => res.send("unpin a bookmark"));

export default bookmarkRouter;
