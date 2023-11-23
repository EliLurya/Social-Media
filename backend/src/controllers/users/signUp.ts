import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import { User } from "../../types/userTypes";

const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const router: Router = express.Router();
const bcrypt = require("bcrypt");

// User sign-up
router.post("/signup", jsonParser, async (req: Request, res: Response) => {
  const { email, password, userName, role } = req.body;
  
  if (!email || !password || !userName) {
    res.status(400).json({
      success: false,
      error: "You have to fill email, password, and name",
    });

    return;
  }
  //I do the validation in a password here and not in the Schema,
  //because i use with bcrypt before i send it to DB
  if (password.length < 8) {
    res.status(400).json({
      success: false,
      error: "Password must be at least 8 characters long",
    });
    return;
  }
  if (password.length > 30) {
    res.status(400).json({
      success: false,
      error: "Password must be a maximum of 30 characters long",
    });
    return;
  }
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(password);
  if (!(hasLowercase && hasUppercase && hasDigit && hasSpecialChar)) {
    res.status(400).json({
      success: false,
      error:
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
    });
    return;
  }
  try {
    // Check if a user with the same email already exists
    const existingUser: User | null = await UserModel.findOne({ email });
    if (existingUser) {
      // User exists with Google ID and no password
      if (existingUser.googleId && !existingUser.password) {
        // Allow setting a password
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
        await existingUser.save();
        return res.json({
          success: true,
          message: "Password set successfully. Please log in.",
        });
      } else {
        // User already exists with a regular sign-up
        res
          .status(400)
          .json({ success: false, error: "Email already registered" });
        return;
      }
    }

    // Hash the password using bcrypt before saving
    const hashedPassword: string = await bcrypt.hash(password, 10);
    // Create a new user using the UserModel
    const newUser: User = new UserModel({
      email,
      password: hashedPassword,
      userName,
      role,
    });
    // Save the new user to the database
    await newUser.save();
    res.json({ success: true, message: "User signed up successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
