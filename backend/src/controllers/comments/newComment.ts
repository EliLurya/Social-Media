import express, { Request, Response, Router } from "express";
import CommentModel from "../../models/commentSchema";
import { authentication } from "../../middleware/authMiddleware";

const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const router: Router = express.Router();

// Create a new comment
router.post(
  "/newComment",
  jsonParser,
  authentication("user"),
  async (req: Request, res: Response) => {
    const { comment, postId, parentCommentId } = req.body;
    try {
      // Create a new instance of CommentModel and set its properties
      const newComment = new CommentModel({
        userId: req.user.userId, 
        comment,
        postId,
        parentComment: parentCommentId || null,
      });
      // Save the new comment to the database
      const savedComment = await newComment.save(); // Save the comment and get the saved instance
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
