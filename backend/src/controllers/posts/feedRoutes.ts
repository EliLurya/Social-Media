import express, { Request, Response } from "express";
import { authentication } from "../../middleware/authMiddleware";
import PostModel from "../../models/postSchema";
import CommentModel from "../../models/commentSchema";

const router = express.Router();

/**
 * Route to get a paginated list of all posts with enriched comments.
 * It supports pagination through 'lastPostId' and limits the number of posts returned.
 */
router.get(
  "/feed",
  authentication("user"),
  async (req: Request, res: Response) => {
    // Parse 'limit' from query parameters or default to 10.
    const limit: number = parseInt(req.query.limit as string) || 10;
    // Extract the authenticated user's ID from the request.
    const userId: string = req.user.userId;
    // Parse 'lastPostId' from query parameters; it may be undefined. This is used for pagination.
    const lastPostId: string | undefined = req.query.lastPostId as string;

    try {
      let query: any = {}; // Initialize an empty query object.

      // If 'lastPostId' is provided, adjust the query to fetch posts older than 'lastPostId'.
      if (lastPostId) {
        query._id = { $lt: lastPostId };
      }

      // Fetch posts from the database based on the query.
      const posts = await PostModel.find(query)
        .populate("user", "_id userName") // Populate user data (ID and userName).
        .populate({
          path: "comments", // Populate comments associated with the post.
          model: CommentModel, // Specify the model for comments.
          select: "user comment createdAt likes idPeopleThatLike", // Select specific fields from comments.
          options: { sort: { createdAt: -1 } }, // Sort comments by creation date.
        })
        .sort({ createdAt: -1 }) // Sort posts by creation date.
        .limit(limit); // Limit the number of posts returned.

      // Map over the posts to add user interaction information.
      const postsWithLikeStatusAndComments = posts.map((post) => {
        // Determine if the user has liked the post.
        const userLikedPost = post.idPeopleThatLike.some((id) =>
          id.equals(userId)
        );
        // Determine if the user is the creator of the post.
        const isCreatorPost = post.user._id.equals(userId);

        // Process each comment to determine if the user created or liked the comment.
        const enrichedComments = post.comments.map((comment) => {
          // Check if the user is the creator of the comment.
          const isCreatorComment = comment.user._id.equals(userId);
          // Check if the user has liked the comment.
          const userLikedComment = comment.idPeopleThatLike.some((id) =>
            id.equals(userId)
          );
          // Return the comment with additional properties for user interaction.
          return {
            ...comment.toObject(),
            isCreatorComment, // Include if the user is the creator of the comment.
            userLikedComment, // Include if the user liked the comment.
          };
        });

        // Return the post with additional properties for user interaction.
        return {
          ...post.toObject(),
          userLikedPost, // Include if the user liked the post.
          likes: post.idPeopleThatLike.length, // Include the number of likes on the post.
          isCreatorPost, // Include if the user is the creator of the post.
          comments: enrichedComments, // Include the enriched comments in the response.
        };
      });

      // Send the response with the enriched posts.
      res.json(postsWithLikeStatusAndComments);
    } catch (error) {
      // Log and handle any errors during the database query.
      console.error("Error fetching posts:", error);
      res.status(500).send(error);
    }
  }
);

export default router;
