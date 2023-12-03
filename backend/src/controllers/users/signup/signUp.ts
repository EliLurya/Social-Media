import express, { Request, Response, Router } from "express";
import UserModel from "../../../models/userSchema";
import { User } from "../../../types/userTypes";
import TempUser from "../../../models/tempUserSchema";
const crypto = require("crypto");
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const router: Router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USERNAME,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});
// User sign-up
// First time with validateOnly, it's not save in DB, and in the secound call without validateOnly, it save in DB
router.post("/signup", jsonParser, async (req: Request, res: Response) => {
  const {
    email,
    password,
    userName,
    role,
    validateOnly,
    userVerificationCode,
  } = req.body;

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
        console.log("exist");
        
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
        await existingUser.save();
        return res.json({
          success: true,
          message: "Password set successfully, connected by Google",
        });
      } else {
        // User already exists with a regular sign-up
        res
          .status(400)
          .json({ success: false, message: "Email already registered" });
        return;
      }
    }

    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Set expiry for the code
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    const hashedPassword: string = await bcrypt.hash(password, 10);

    if (validateOnly) {
      const findEmail = await TempUser.findOne({ email });
      if (findEmail) {
        await TempUser.deleteOne({ email });
      }
      // Store user data in TempUser collection with verification code
      const tempUser = new TempUser({
        email,
        password: hashedPassword,
        userName,
        verificationCode,
        verificationCodeExpiry: expiry,
      });
      await tempUser.save();

      // Send verification email
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Email Verification",
        html: `<p>Your verification code is: <h3>${verificationCode}</h3></p>
             <p>Please enter this code in the application to verify your email address.</p>`,
      };

      // Send email (without returning the code in the response)
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending verification email:", error);
          res
            .status(500)
            .json({ success: false, error: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
          res.json({
            success: true,
            message: "Verification email sent",
          });
        }
      });
    } else {
      // When !validateOnly, verify the code and create a new user
      const tempUser = await TempUser.findOne({ email });
      if (
        !tempUser || 
        tempUser.verificationCode !== userVerificationCode ||
        tempUser.verificationCodeExpiry < new Date()
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid or expired verification code",
        });
        return;
      }

      // Create a new user using the UserModel
      const newUser: User = new UserModel({
        email,
        password: hashedPassword,
        userName,
        role,
      });
      await newUser.save();

      // Delete the temporary record
      await TempUser.deleteOne({ email });

      res.json({ success: true, message: "User signed up successfully" });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
export default router;
