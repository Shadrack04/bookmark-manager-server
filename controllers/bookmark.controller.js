import { Bookmark } from "../models/bookmark.model.js";

export const createBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Bookmark created successfully",
      data: bookmark,
    });
  } catch (error) {
    next(error);
  }
};
