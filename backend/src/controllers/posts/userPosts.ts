import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import { authentication } from "../../middleware/authMiddleware";
import { User } from "../../types/userTypes";

const router: Router = express.Router();

// Route to get posts of a specific user by ID
router.get(
  "/posts",
  authentication("user"), // Apply authentication middleware for user access
  async (req: Request, res: Response) => {
    const id: string = req.user.userId; // Get user ID from authenticated request
    try {
      // Find the user by ID in the database and populate the "posts" field
      const user = await UserModel.findOne({ _id: id }).populate("posts");
      if (user) {
        res.json({ success: true, data: user.posts });
      } else {
        // Respond with error if user is not found
        res.status(404).json({ success: false, error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
