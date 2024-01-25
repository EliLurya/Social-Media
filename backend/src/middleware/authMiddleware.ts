import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { codeError } from "../utils/errorCodeServer/errorCodeServer";

// Middleware function for authentication
export const authentication = (access: string) => {
  const validateToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
      res.status(codeError.Unauthorized).json({ success: false, error: "Missing token" });
      return;
    }

    try {
      // Verify the token using JWT
      const decodedToken = jwt.verify(
        token,
        process.env.YOUR_SECRET_KEY
      ) as JwtPayload;

      // Set user and role information in the request
      req.user = { userId: decodedToken.userId };
      req.role = { role: decodedToken.role };

      // Check if the user's role has access to the specified resource
      if (access !== req.role.role) {
        res.status(codeError.Forbidden).json({ success: false, error: "Forbidden" });
        return;
      }

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle invalid token or other errors
      res.status(codeError.Unauthorized).json({ success: false, error: "Invalid token" });
    }
  };
  return validateToken;
};
