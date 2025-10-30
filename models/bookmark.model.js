import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },
    url: {
      type: String,
      required: [true, "Url is required"],
      match: /^https?:\/\/.+/,
      trim: true,
      index: true,
    },

    favicon: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },

    visitCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    lastVisited: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ title: 1 });
bookmarkSchema.index({ url: 1 });
bookmarkSchema.index({ isArchived: 1 });
bookmarkSchema.index({ userId: 1, title: 1 });

bookmarkSchema.pre("save", async function (next) {
  // Only fetch metadata if it's a new bookmark or URL changed
  if (this.isNew || this.isModified("url")) {
    const { description, favicon } = await fetchMetadata(this.url);

    if (!this.description && description) {
      this.description = description;
    }

    if (!this.favicon) {
      this.favicon = favicon || this.title.charAt(0).toUpperCase();
    }
  }

  next();
});

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
