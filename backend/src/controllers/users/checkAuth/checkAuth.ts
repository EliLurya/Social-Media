import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

const router: Router = express.Router();

router.get("/check-auth", (req: Request, res: Response) => {
  const token = req.cookies.token; // Retrieve the token from the cookie
  
  if (!token) {
    return
    
  //   res.status(401).json({ success: false, message: "Not authenticated" });
  //   return;
   }

  jwt.verify(token, process.env.YOUR_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      // Handle the error if the token is invalid or expired
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // If token is valid, you might want to do additional checks here,
    // such as checking if the user still exists in your database.

    
    res.json({ success: true, message: "Authenticated", user: decodedToken });
  });
});

export default router;
