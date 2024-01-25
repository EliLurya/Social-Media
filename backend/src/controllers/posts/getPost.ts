import express, { Request, Response } from "express";
import { authentication } from "../../middleware/authMiddleware";
import populatePosts from "../../utils/populatePosts";
import bodyParser from "body-parser";
import { codeError } from "../../utils/errorCodeServer/errorCodeServer";

const router = express.Router();
const jsonParser = bodyParser.json();

router.post(
  "/getPost",
  jsonParser,
  authentication("user"),
  async (req: Request, res: Response) => {
    const userId = req.user.userId; // Get the authenticated user's ID
    const { id, commentsLimit, lastCommentId } = req.body; // Get the post ID, commentsLimit, and lastCommentId from the request body

    if (!id) {
      return res
        .status(codeError.BadRequest)
        .json({ success: false, error: "Post ID is required" }); // Check if the post ID is provided
    }

    try {
      const query = { _id: id }; // Construct a query to fetch the specific post by ID
      const commentsLimitParsed = parseInt(commentsLimit) || 5; // Parse commentsLimit or default to 5
      const postsWithLikeStatusAndComments = await populatePosts(
        query,
        userId,
        1, // Limit is 1 because we are fetching a single post
        undefined, // lastPostId is undefined because we are fetching a specific post by ID
        true, // includeComment is true because we want to include comment details
        commentsLimitParsed, // Pass the parsed commentsLimit
        lastCommentId // Pass the lastCommentId for comment pagination
      ); // Use the utility function to fetch and enrich the post

      // Check if the post is found
      if (!postsWithLikeStatusAndComments.length) {
        return res
          .status(codeError.NotFound)
          .json({ success: false, error: "Post not found" }); // Handle case where the post is not found
      }

      res.json(postsWithLikeStatusAndComments[0]); // Send the response with the enriched post (first element of the array)
    } catch (error) {
      console.error("Error fetching post:", error); // Log and handle any errors during the database query
      res
        .status(codeError.InternalServerError)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
