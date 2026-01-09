import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
  tagName: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    index: true,
    unique: true,
  },
});

export const Tag = mongoose.model("Tag", tagsSchema);
