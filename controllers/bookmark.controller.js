import { Bookmark } from "../models/bookmark.model.js";
import { fail, success } from "../services/response.js";

export const createBookmark = async (req, res, next) => {
  try {
    const { url } = req.body;
    const existing = await Bookmark.findOne({ url });
    if (existing) {
      const error = {};
      error.message = "Url already exist in bookmark list";
      error.statusCode = 400;
      throw error;
    }
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
    const {
      search,
      isArchived = "false",
      sortBy = "-createdAt",
      tags,
    } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: new RegExp(search, "i") };
    }

    if (isArchived) {
      query.isArchived = isArchived === "true";
    }

    let sortOption = {};
    if (sortBy) {
      const sortField = sortBy.startsWith("-") ? sortBy.substring(1) : sortBy;
      const sortOrder = sortBy.startsWith("-") ? -1 : 1;
      sortOption[sortField] = sortOrder;
    }

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    const bookmarks = await Bookmark.find({
      userId: req.user._id,
      ...query,
    }).sort(sortOption);

    const totalCount = await Bookmark.countDocuments();

    success(res, bookmarks, 200, totalCount);
  } catch (error) {
    next(error);
  }
};

export const getBookmarkById = async (req, res, next) => {
  try {
    // const bookmark = await Bookmark.findById({ _id: req.params.id });
    const bookmark = await Bookmark.findOne({ _id: req.params.id });
    const totalCount = await Bookmark.countDocuments();

    if (!bookmark) {
      const message = "Bookmark not found";
      return fail(res, message, 404);
    }
    success(res, bookmark, 200, totalCount);
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

export const updateVisitCount = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const bookmark = await Bookmark.findById(id);
    bookmark.visitCount = bookmark.visitCount + 1;
    await bookmark.save();

    success(res, bookmark, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteBookmarkById = async (req, res, next) => {
  try {
    const deleteCount = await Bookmark.deleteOne({ _id: req.params.id });

    success(res, deleteCount, 200);
  } catch (error) {
    next(error);
  }
};

// shadrack.vercel.app id => 69049bd4e3a4a5a8dad48537
