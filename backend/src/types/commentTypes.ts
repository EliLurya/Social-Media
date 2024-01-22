import mongoose from "mongoose";
import { User } from "./userTypes";
import { Post } from "./postTypes";
import { LikeEntry } from "./likeEntryTypes";

export interface Comment extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  comment: string;
  imageUrl: string;
  createdAt: Date;
  parentComment: mongoose.Types.ObjectId | null;
  postId: mongoose.Types.ObjectId;
  likes: number;
  comments: mongoose.Types.ObjectId[];
  idPeopleThatLike: mongoose.Types.ObjectId[] | LikeEntry[];
}
