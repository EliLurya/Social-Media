import mongoose from "mongoose";
import { User } from "./userTypes";
import { Post } from "./postTypes";

export interface LikeEntry {
  idUser: mongoose.Types.ObjectId | User;
  idPostUser: mongoose.Types.ObjectId | Post;
}
