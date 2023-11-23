import mongoose from "mongoose";
import { User } from "../types/userTypes";

const userSchema = new mongoose.Schema<User>({
  googleId: String,
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
  password: {
    type: String,
    trim: true,
  },
  signUp: {
    type: Date,
    required: true,
    default: Date.now,
    immutable: true, // Prevent updates after the initial value is set
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likesILike: [{ type: mongoose.Schema.Types.ObjectId, ref: "LikeEntry" }],
  follow: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  userName: { type: String, required: [true, "You have to enter a name"] },
  role: { type: String, default: "user" },
  rank: { type: Number, default: 0, min: [0, "rank cannot be negative"] },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
});

// Custom validation for the signIn field to ensure it's a valid date
userSchema.path("signUp").validate(function (value: Date) {
  return value instanceof Date && !isNaN(value.getTime());
}, "Invalid date format for signIn field.");

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
