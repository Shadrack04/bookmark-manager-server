import { Bookmark } from "../models/bookmark.model.js";
import { fail, success } from "../services/response.js";

export const createBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      userId: req.user._id,
    });

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

export const getBookmarkById = async (req, res, next) => {
  try {
    // const bookmark = await Bookmark.findById({ _id: req.params.id });
    const bookmark = await Bookmark.findOne({ _id: req.params.id });

    if (!bookmark) {
      const message = "Bookmark not found";
      return fail(res, message, 404);
    }
    success(res, bookmark, 200);
  } catch (error) {
    next(error);
  }
};

export const updateBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { runValidators: true }
    );

    success(res, bookmark, 200);
  } catch (error) {
    next(error);
  }
};

// shadrack.vercel.app id => 69049bd4e3a4a5a8dad48537
