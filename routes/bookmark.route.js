import { Router } from "express";

const bookmarkRouter = Router();

bookmarkRouter.get("/", (req, res) => res.send("get all bookmarks"));

bookmarkRouter.get("/:id", (req, res) => res.send("get a single bookmark"));
bookmarkRouter.post("/", (req, res) => res.send("create bookmark"));
bookmarkRouter.put("/:id", (req, res) => res.send("update a bookmark"));
bookmarkRouter.delete("/:id", (req, res) => res.send("delete a bookmark"));

bookmarkRouter.patch("/:id/view", (req, res) =>
  res.send("increase view count")
);
bookmarkRouter.post("/:id/archive", (req, res) =>
  res.send("archive a bookmark")
);
bookmarkRouter.post("/:id/unarchive", (req, res) =>
  res.send("unarchive a bookmark")
);
bookmarkRouter.post("/:id/pin", (req, res) => res.send("pin a bookmark"));
bookmarkRouter.post("/:id/unpin", (req, res) => res.send("unpin a bookmark"));

export default bookmarkRouter;
