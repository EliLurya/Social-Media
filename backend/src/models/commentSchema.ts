import mongoose from "mongoose";
import { Comment } from "../types/commentTypes";

const commentSchema = new mongoose.Schema<Comment>({
  comment: {
    type: String,
    maxlength: [280, "comment can be up to 280 characters long"],
  },
  imageUrl: { type: String },
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
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "postId is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, "likes cannot be negative"],
  },
  idPeopleThatLike: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LikeEntry" },
  ],
  comments: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
});

const CommentModel = mongoose.model<Comment>("Comment", commentSchema);
module.exports = CommentModel;
export default CommentModel;
