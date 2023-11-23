import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import { User } from "../../types/userTypes";
import { authentication } from "../../middleware/authMiddleware";
import mongoose from "mongoose"; // Import mongoose

const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const PostModel = require("../../models/postSchema");
const router: Router = express.Router();

// Update post route
router.put(
  "/updatePost/:idPost",
  jsonParser,
  authentication("user"), // Apply authentication middleware
  async (req: Request, res: Response) => {
    const userId: string = req.user.userId; // Get user ID from authenticated request
    const postId: string = req.params.idPost;
    const { post } = req.body;
    if (!post) {
      res
        .status(400)
        .json({ success: false, error: "Send to the body update post" });
      return;
    }
    try {
      // Find the user by ID in the database
      const user: User | null = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      // Find the post to be updated by ID
      const postToUpdate: mongoose.Document | null = await PostModel.findOne({
        _id: postId,
      });
      if (!postToUpdate) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }
      // Update the post content
      postToUpdate.set({ post });
      await postToUpdate.save();
      res.json({
        success: true,
        message: "Update successfully",
        data: postToUpdate,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
