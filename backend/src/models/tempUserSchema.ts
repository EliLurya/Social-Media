import mongoose from "mongoose";
import { TempUser } from "../types/tempUserTypes";

const tempUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format.",
    },
    trim: true,
  },
  verificationCode: String,
  verificationCodeExpiry: Date,
});

// When the verification code expires, delete from the DB
tempUserSchema.index({ verificationCodeExpiry: 1 }, { expireAfterSeconds: 0 });

const TempUser = mongoose.model("TempUser", tempUserSchema);

export default TempUser;
