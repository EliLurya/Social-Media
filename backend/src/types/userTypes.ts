import mongoose from "mongoose";

export interface User extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  googleId: String;
  email: string;
  password: string;
  signUp: Date;
  posts: mongoose.Types.ObjectId[];
  likesILike: mongoose.Types.ObjectId[];
  follow: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  userName: string;
  role: string;
  rank: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationCode: string;
  verificationCodeExpiry: Date;
}
