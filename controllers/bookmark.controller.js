import { Bookmark } from "../models/bookmark.model.js";
import { success } from "../services/response.js";

export const createBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      userId: req.user._id,
    });

    // res.status(201).json({
    //   success: true,
    //   message: "Bookmark created successfully",
    //   data: bookmark,
    // });

    success(res, bookmark, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id });
    success(res, bookmarks, 200);
  } catch (error) {
    next(error);
  }
};
