import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

// Middleware function for authentication
export const authentication = (access: string) => {
  // Inner function to validate the token
  const validateToken = (req: Request, res: Response, next: NextFunction) => {
    // Check if authorization header exists
    if (!req.headers.authorization) {
      res.status(401).json({ success: false, error: "Missing token" });
      return;
    }
    // Extract token from Authorization header
    const token: string = req.headers.authorization.replace("Bearer ", "");
    try {
      // Verify the token using JWT
      const decodedToken: jwt.JwtPayload = jwt.verify(
        token,
        process.env.YOUR_SECRET_KEY
      ) as JwtPayload;
      // Set user and role information in the request
      req.user = { userId: decodedToken.userId };
      req.role = { role: decodedToken.role };
      // Check if the user's role has access to the specified resource
      if (access !== req.role.role) {
        res.status(403).json({ success: false, error: "Forbidden" });
        return;
      }
      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle invalid token or other errors
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
  };
  return validateToken;
};
