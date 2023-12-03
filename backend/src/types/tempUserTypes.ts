import mongoose from "mongoose";

export interface TempUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
}
