import mongoose from "mongoose";
import { Comment } from "./commentTypes";
import { LikeEntry } from "./likeEntryTypes";

interface UserRef {
  _id: mongoose.Types.ObjectId;
  userName: string;
}

export interface Post {
  _id: mongoose.Types.ObjectId;
  user: UserRef;
  text: string;
  imageUrl: string;
  likes: number;
  idPeopleThatLike: mongoose.Types.ObjectId[] | LikeEntry[];
  comments: mongoose.Types.ObjectId[] | Comment[];
  createdAt: Date;
  rankPost: number;
}
