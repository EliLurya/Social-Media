import express, { Request, Response, Router } from "express";
import { authentication } from "../../middleware/authMiddleware";
import populatePosts from "../../utils/populatePosts"; 

const router: Router = express.Router();

// Define the GET route to fetch posts associated with a specific user
router.get(
  "/posts",
  authentication("user"), // Middleware to ensure the user is authenticated
  async (req: Request, res: Response) => {
    const userId = req.user.userId; // Extract the authenticated user's ID from the request
    const limit = parseInt(req.query.limit as string) || 10; // Parse 'limit' from query parameters or default to 10
    const lastPostId = req.query.lastPostId as string | undefined; // Parse 'lastPostId' from query parameters for pagination purposes

    try {
      // Construct a query to fetch posts where the user is the creator, liker, or commenter
      const baseQuery = {
        $or: [
          { user: userId }, // Posts created by the user
          { idPeopleThatLike: userId }, // Posts liked by the user
          { "comments.user": userId }, // Posts commented on by the user
        ],
      };

      // Use the populatePosts utility function to fetch and enrich posts based on the constructed query
      const postsWithLikeStatusAndComments = await populatePosts(
        baseQuery,
        userId,
        limit,
        lastPostId
      );

      res.json(postsWithLikeStatusAndComments);
    } catch (error) {
      console.error("Error fetching user activity:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
