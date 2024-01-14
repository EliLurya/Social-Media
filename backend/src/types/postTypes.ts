import mongoose from "mongoose";
import { Comment } from "./commentTypes"; 
import { LikeEntry } from "./likeEntryTypes"; 

export interface Post {
  _id: mongoose.Types.ObjectId;
  user: String;
  text: string;
  imageUrl:string
  likes: number;
  idPeopleThatLike: mongoose.Types.ObjectId[] | LikeEntry[];
  comments: mongoose.Types.ObjectId[] | Comment[];
  createdAt: Date;
  rankPost: number;
}
