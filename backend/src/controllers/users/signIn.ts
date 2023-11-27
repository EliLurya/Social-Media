import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import { User } from "../../types/userTypes";

const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const router: Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// User sign-in
router.post("/signin", jsonParser, async (req: Request, res: Response) => {
  const { email, password } = req.body; // `login` can be either the email or the username

  if (!email || !password) {
    res.status(400).json({ success: false, error: "Enter email and password" });
    return;
  }
  try {
    // Find the user by email or username
    const user: User | null = await UserModel.findOne({ email: email });

    // If the user doesn't exist, return an error
    if (!user) {
      res.status(401).json({ success: false, error: "User not found" });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      res
        .status(401)
        .json({ success: false, error: "Invalid login credentials" });
      return;
    }

    // Generate a JWT token
    const token: string = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.YOUR_SECRET_KEY as string, 
      {
        expiresIn: "8h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 8 * 3600000, // 8 hours in milliseconds
    });

    res.json({
      success: true,
      message: "User signed in successfully",
    });

  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
