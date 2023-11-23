import mongoose from "mongoose";
import { User } from "./userTypes";
import { Post } from "./postTypes";
import { LikeEntry } from "./likeEntryTypes";

export interface Comment extends mongoose.Document {
  userId: mongoose.Types.ObjectId | User;
  comment: string;
  createdAt: Date;
  parentComment: mongoose.Types.ObjectId | Comment | null;
  postId: mongoose.Types.ObjectId | Post;
  likes: number;
  comments: mongoose.Types.ObjectId[] | Comment[];
  idPeopleThatLike: mongoose.Types.ObjectId[] | LikeEntry[];
}
