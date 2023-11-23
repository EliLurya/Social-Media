import express, { Request, Response } from "express";
import UserModel from "../../models/userSchema";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
// Node's built-in crypto module for generating random tokens
const crypto = require("crypto");
const body_parser = require("body-parser");
const jsonParser = body_parser.json();

// Configure Nodemailer transporter for sending emails
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

// POST route to request a password reset
router.post(
  "/request-password-reset",
  jsonParser,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      // Respond with an error if email is not provided
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        // Respond with a generic message to prevent email enumeration attacks
        return res.status(200).json({
          success: true,
          message:
            "If that email address is in our database, we will send you an email to reset your password",
        });
      }
      // Generate a random password reset token
      const resetToken = crypto.randomBytes(20).toString("hex");
      // Hash the token for secure storage in the database
      const hashedResetToken = await bcrypt.hash(resetToken, 10);
      // Set the password reset token and expiration on the user's record
      user.resetPasswordToken = hashedResetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
      // Save the updated user object
      await user.save();
      // Create reset password URL
      const resetUrl = `${process.env.URL_FRONTED}/reset-password/${resetToken}`;
      // Email options for sending the reset link
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USERNAME,
        subject: "Your password reset token",
        text: `Please click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Send mail failed:", error);
          return res
            .status(500)
            .json({ success: false, error: "Error sending reset email" });
        }
        res.status(200).json({
          success: true,
          message:
            "An email has been sent to " +
            user.email +
            " with further instructions.",
        });
      });
    } catch (error) {
      console.error("Password reset failed:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// POST route to reset the password
router.post("/reset-password", jsonParser, async (req, res) => {
  // Extract the reset token and new password from request body
  const { resetToken, newPassword } = req.body;
  try {
    // Find the user with a valid reset token and token expiration
    const user = await UserModel.findOne({
      resetPasswordExpires: { $gt: Date.now() },
    });

    // Check if the provided token matches the hashed token in the database
    if (user && (await bcrypt.compare(resetToken, user.resetPasswordToken))) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update the user's password, clear the reset token and expiration
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      res.json({
        success: true,
        message: "Password reset successful",
      });
    } else {
      // Respond with error if the token is invalid or expired
      res.status(400).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// GET route to validate a reset token
router.get("/validate-reset-token/:token", async (req, res) => {
  // Extract the token from the URL parameter
  const { token } = req.params;

  try {
    // Fetch all users to find a match for the token
    const users = await UserModel.find();
    let user = null;
    // Iterate through users to find one with a matching reset token
    for (const u of users) {
      if (
        u.resetPasswordToken &&
        (await bcrypt.compare(token, u.resetPasswordToken))
      ) {
        user = u;
        break;
      }
    }
    // If no user is found with the token, return an error
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Reset token does not exist.",
      });
    }
    // Check if the token is still valid (not expired)
    if (
      user.resetPasswordExpires &&
      user.resetPasswordExpires.getTime() > Date.now()
    ) {
      res.json({
        success: true,
        message: "Reset token is valid",
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Reset token has expired",
      });
    }
  } catch (error) {
    console.error("Error validating reset token:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
export default router;
