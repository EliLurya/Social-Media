import { OAuth2Client } from "google-auth-library";
import { Request, Response, Router } from "express";
import UserModel from "../../../models/userSchema";
const jwt = require("jsonwebtoken");
const body_parser = require("body-parser");
const jsonParser = body_parser.json(); // Middleware for parsing JSON bodies
const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Google OAuth2 client
const bcrypt = require("bcrypt");

// POST route for signing up with Google
router.post(
  "/signupgoogle",
  jsonParser,
  async (req: Request, res: Response) => {
    const { tokenGoogle } = req.body; // Extract Google token from request body
    try {
      // Verify Google token and get payload
      const ticket = await client.verifyIdToken({
        idToken: tokenGoogle,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(401).json({ error: "Invalid Google token" });
      }

      const { email, name } = payload;
      let user = await UserModel.findOne({ email });

      if (!user) {
        user = new UserModel({
          googleId: payload.sub,
          email,
          userName: name,
        });
        await user.save();
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.YOUR_SECRET_KEY,
        { expiresIn: "8h" }
      );

      // Set the token as an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 8 * 3600000, // 8 hours in milliseconds
      });

      res.json({
        success: true,
        message: "Google sign-in successful",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
