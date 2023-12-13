import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import { authentication } from "../../middleware/authMiddleware";
import { User } from "../../types/userTypes";
import PostModel from "../../models/postSchema";

const router: Router = express.Router();

// Route to get posts of a specific user by ID
router.get(
  "/posts",
  authentication("user"), // Apply authentication middleware for user access
  async (req: Request, res: Response) => {
    const id: string = req.user.userId; // Get user ID from authenticated request
    try {
      // Find all posts by the user ID and populate the "user" field
      const posts = await PostModel.find({ user: id }) // Filter posts by user ID
        .populate("user", "userName") // Populate the "user" field
        .sort({ createdAt: -1 }); // Sort by creation date

      if (posts.length > 0) {
        res.json(posts);
      } else {
        // Respond with an error or a message if no posts are found
        res
          .status(404)
          .json({ success: false, error: "No posts found for this user" });
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
