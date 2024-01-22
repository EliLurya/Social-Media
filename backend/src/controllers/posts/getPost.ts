import express, { Request, Response, Router } from "express";
import { authentication } from "../../middleware/authMiddleware";
import PostModel from "../../models/postSchema";
import CommentModel from "../../models/commentSchema";

const router: Router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// Route to fetch a single post by its ID
router.post(
  "/getPost",
  jsonParser,
  authentication("user"),
  async (req: Request, res: Response) => {
    const userId = req.user.userId; // Get the authenticated user's ID
    const { id } = req.body; // Get the post ID from the request body

    // Check if the post ID is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Post ID is required" });
    }

    try {
      // Fetch the post by ID and populate related data
      const findPost = await PostModel.findOne({ _id: id })
        .populate("user", "userName _id") // Populate user data: userName and _id
        .populate({
          path: "comments", // Populate comments associated with the post
          model: CommentModel, // Specify the model for comments
          select: "user comment createdAt likes idPeopleThatLike", // Select specific fields from comments
          options: { sort: { createdAt: -1 } }, // Sort comments by creation date
        });

      // Handle case where the post is not found
      if (!findPost) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }

      // Process each comment to determine if the user created or liked the comment
      const enrichedComments = findPost.comments.map((comment) => {
        // Check if the current user is the creator of the comment
        const isCreatorComment = comment.user._id.equals(userId);
        // Check if the current user has liked the comment
        const userLikedComment = comment.idPeopleThatLike.some((id) =>
          id.equals(userId)
        );

        // Return the comment with added properties for isCreatorComment and userLikedComment
        return {
          ...comment.toObject(),
          isCreatorComment,
          userLikedComment,
        };
      });

      // Check if the current user has liked the post
      const userLikedPost = findPost.idPeopleThatLike.some((id) =>
        id.equals(userId)
      );
      // Check if the current user is the creator of the post
      const isCreator = findPost.user._id.toString() === userId;

      // Prepare the response with additional information about the user's interaction with the post and its comments
      const postResponse = {
        ...findPost.toObject(),
        userLikedPost, // Include if the user liked the post
        likes: findPost.idPeopleThatLike?.length || 0, // Include the number of likes on the post
        isCreator, // Include if the user is the creator of the post
        comments: enrichedComments, // Include the enriched comments
      };

      // Send the response with the post and additional information
      res.json(postResponse);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
