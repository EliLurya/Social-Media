import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import CommentModel from "../../models/commentSchema";
import { User } from "../../types/userTypes";
import { authentication } from "../../middleware/authMiddleware";
import PostModel from "../../models/postSchema";

const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const router: Router = express.Router();

// New comment route
router.post(
  "/newComment",
  jsonParser,
  authentication("user"), // Apply authentication middleware for user access
  async (req: Request, res: Response) => {
    const userId: string = req.user.userId; // Get user ID from authenticated request
    const { comment, postId, parentCommentId, imageUrl } = req.body;

    if (!comment && !imageUrl) {
      res
        .status(400)
        .json({
          success: false,
          error: "Comment text or imageUrl is required",
        });
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

      // Create a new instance of CommentModel and set its properties
      const newComment = new CommentModel({
        user: userId,
        comment,
        postId,
        parentComment: parentCommentId || null, 
        createdAt: new Date(),
        imageUrl,
        likes: 0,
        idPeopleThatLike: [],
      });

      // Save the new comment to the database
      const savedComment = await newComment.save();

      // Add the comment's ID to the post's comments array
      await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: savedComment._id },
      });
      // If there's a parent comment ID, update the parent comment's child comments array
      if (parentCommentId) {
        const parentComment = await CommentModel.findById(parentCommentId);
        if (parentComment) {
          parentComment.comments.push(savedComment._id);
          await parentComment.save();
        }
      }

      res.json({
        success: true,
        data: savedComment,
        message: "Comment created successfully",
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
