import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import mongoose from "mongoose";
import { User } from "../../types/userTypes";
import { Post } from "../../types/postTypes";

import { authentication } from "../../middleware/authMiddleware";

const PostModel = require("../../models/postSchema");
const router: Router = express.Router();

// Remove post route
router.delete(
  "/deletePost/:idPost",
  authentication("user"), // Apply authentication middleware
  async (req: Request, res: Response) => {
    const userId: string = req.user.userId; // Get user ID from authenticated request
    const postId: string = req.params.idPost;
    try {
      // Find the user by ID in the database
      const user: User | null = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      // Find the post to be deleted by ID
      const postToDelete: Post | null = await PostModel.findOne({
        _id: postId,
      });
      if (!postToDelete) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }
      // Create a copy of the post to be deleted before deleting it
      const dataPost: Post = { ...postToDelete };
      // Delete the post from the database
      await PostModel.deleteOne({ _id: postId });
      // Remove the deleted post from the user's posts array using a loop
      const updatedPosts: mongoose.Types.ObjectId[] = [];
      for (const postIdObj of user.posts as mongoose.Types.ObjectId[]) {
        if (postIdObj.toString() !== postId) {
          updatedPosts.push(postIdObj);
        }
      }
      user.posts = updatedPosts;
      await user.save();
      // Respond with success message and deleted post data
      res.json({
        success: true,
        message: "Post deleted successfully",
        data: dataPost,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
