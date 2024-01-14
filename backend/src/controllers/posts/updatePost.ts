import express, { Request, Response, Router } from "express";
import { authentication } from "../../middleware/authMiddleware";

const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const PostModel = require("../../models/postSchema");
const router: Router = express.Router();

// Update post route
router.put(
  "/updatePost/:postId",
  jsonParser,
  authentication("user"),
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const postId = req.params.postId;
    const { post: postData, like } = req.body;

    if (!postData && !like) {
      res.status(400).json({
        success: false,
        error: "Send to the body update post or update like",
      });
      return;
    }
    try {
      // Find the post to be updated by ID
      const postToUpdate = await PostModel.findOne({ _id: postId });
      if (!postToUpdate) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }

      // Handle like/unlike functionality
      if (like !== undefined) {
        const index = postToUpdate.idPeopleThatLike.indexOf(userId);
        const update =
          index > -1
            ? { $pull: { idPeopleThatLike: userId }, $inc: { likes: -1 } }
            : { $addToSet: { idPeopleThatLike: userId }, $inc: { likes: 1 } };

        const updatedPost = await PostModel.findOneAndUpdate(
          { _id: postId },
          update,
          { new: true }
        );
        res.json({
          success: true,
          message:
            index > -1
              ? "Like removed successfully"
              : "Like added successfully",
          data: updatedPost,
          userLiked: updatedPost.idPeopleThatLike.includes(userId),
        });
        return;
      }

      // Update post content
      if (postData) {
        const updatedPost = await PostModel.findByIdAndUpdate(
          postId,
          { $set: postData },
          { new: true }
        );
        return res.json({
          success: true,
          message: "Post updated successfully",
          data: updatedPost,
        });
      }

      res.status(400).json({ success: false, error: "No action performed" });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
