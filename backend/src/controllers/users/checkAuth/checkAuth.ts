import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../../models/userSchema";
const bcrypt = require("bcrypt");

const router: Router = express.Router();

router.get("/check-auth", (req: Request, res: Response) => {
  const token = req.cookies.token; // Retrieve the token from the cookie
  
  if (!token) {
    return
    
  //   res.status(401).json({ success: false, message: "Not authenticated" });
  //   return;
   }

  jwt.verify(token, process.env.YOUR_SECRET_KEY, async (err: any, decodedToken: { userId: any; }) => {
    if (err) {
      // Handle the error if the token is invalid or expired
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Check if the user from the token exists in the database
    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      // User does not exist or might have been deleted
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Authenticated", user: decodedToken });
  });
});

export default router;
