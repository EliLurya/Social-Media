import mongoose from "mongoose";
import { Post } from "../types/postTypes";

const postSchema = new mongoose.Schema<Post>({
  post: {
    type: String,
    required: [true, "post is required"],
    minlength: [1, "post must be at least 1 character long"],
    maxlength: [280, "post can be up to 280 characters long"],
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, "likes cannot be negative"],
  },
  idPeopleThatLike: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LikeEntry" },
  ],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  rankPost: {
    type: Number,
    default: 0,
    min: [0, "rank cannot be negative"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    validate: {
      validator: function (value: Date) {
        return value instanceof Date && !isNaN(value.getTime());
      },
      message: "Invalid date format for createdAt field.",
    },
  },
});

const PostModel =
  mongoose.model<Post>("Post", postSchema) || mongoose.model<Post>("Post");
module.exports = PostModel;
export default PostModel;
