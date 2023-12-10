import mongoose from "mongoose";
import { Comment } from "./commentTypes"; // Assuming you move Comment to its own file
import { LikeEntry } from "./likeEntryTypes"; // Assuming you move LikeEntry to its own file

export interface Post {
  _id: mongoose.Types.ObjectId;
  text: string;
  imageUrl:string
  likes: number;
  idPeopleThatLike: mongoose.Types.ObjectId[] | LikeEntry[];
  comments: mongoose.Types.ObjectId[] | Comment[];
  createdAt: Date;
  rankPost: number;
}
