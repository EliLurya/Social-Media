import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import PostModel from "../../models/postSchema";
import CommentModel from "../../models/commentSchema"; // Import the Comment model
import mongoose from "mongoose";
import { User } from "../../types/userTypes";
import { Post } from "../../types/postTypes";
import { authentication } from "../../middleware/authMiddleware";

const router: Router = express.Router();

// Remove post route
router.delete(
  "/deletePost/:idPost",
  authentication("user"), // Apply authentication middleware
  async (req: Request, res: Response) => {
    const userId: string = req.user.userId; // Get user ID from authenticated request
    const postId: string = req.params.idPost;
    try {
      const session = await mongoose.startSession();
      session.startTransaction(); // Start a transaction to ensure atomicity

      // Find the post to be deleted by ID
      const postToDelete: Post | null = await PostModel.findOne({
        _id: postId,
      }).session(session);
      if (!postToDelete) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }

      // Delete the post from the database
      await PostModel.deleteOne({ _id: postId }).session(session);

      // Delete all comments associated with the post
      await CommentModel.deleteMany({ postId: postId }).session(session);

      // Remove the deleted post from the user's posts array
      const user: User | null = await UserModel.findOne({
        _id: userId,
      }).session(session);
      if (user) {
        user.posts = user.posts.filter(
          (postIdObj) => postIdObj.toString() !== postId
        );
        await user.save({ session });
      }

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Respond with success message
      res.json({
        success: true,
        message: "Post and related comments deleted successfully",
        data: postToDelete,
      });
    } catch (error) {
      console.error("Error deleting post and related comments:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
