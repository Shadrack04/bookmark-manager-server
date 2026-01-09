import mongoose from "mongoose";

const tagsSchema = mongoose.Schema({
  tagName: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    index: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: [true, "UserId is required"],
  },
});

export const Tag = mongoose.model("Tag", tagsSchema);
