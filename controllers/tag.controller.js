import { Tag } from "../models/tags.model.js";
import { success } from "../services/response.js";

export const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find({ userId: req.user._id });

    success(res, tags, 200);
  } catch (error) {
    next(error);
  }
};
