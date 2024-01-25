// Filename: feedRoute.js
import express, { Request, Response } from "express";
import { authentication } from "../../middleware/authMiddleware";
import populatePosts from "../../utils/populatePosts";
import { codeError } from "../../utils/errorCodeServer/errorCodeServer";

const router = express.Router();

router.get(
  "/feed",
  authentication("user"), // Middleware to ensure the user is authenticated
  async (req: Request, res: Response) => {
    const limit: number = parseInt(req.query.limit as string) || 10; // Parse 'limit' from query parameters or default to 10
    const userId: string = req.user.userId; // Extract the authenticated user's ID from the request
    const lastPostId: string | undefined = req.query.lastPostId as string; // Parse 'lastPostId' for pagination purposes

    try {
      let query: any = {}; // Initialize an empty query object

      if (lastPostId) {
        query._id = { $lt: lastPostId }; // Adjust the query to fetch posts older than 'lastPostId' for pagination
      }

      const postsWithLikeStatusAndComments = await populatePosts(
        query,
        userId,
        limit,
        lastPostId
      ); // Use the utility function to fetch and enrich posts
      res.json(postsWithLikeStatusAndComments); // Send the response with the enriched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(codeError.InternalServerError).send(error);
    }
  }
);

export default router;
