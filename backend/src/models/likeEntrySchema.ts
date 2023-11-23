import mongoose from "mongoose";
import { LikeEntry } from "../types/likeEntryTypes";

const likeEntrySchema = new mongoose.Schema<LikeEntry>({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idPostUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const LikeEntryModel = mongoose.model<LikeEntry>("LikeEntry", likeEntrySchema);
module.exports = LikeEntryModel;
