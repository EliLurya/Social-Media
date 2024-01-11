import express, { Request, Response, Router } from "express";
import { authentication } from "../../middleware/authMiddleware";
import PostModel from "../../models/postSchema";

const router: Router = express.Router();

/**
 * Route to get a paginated list of posts for a specific user.
 * This route supports pagination and limits the number of posts returned per request.
 */
router.get(
  "/posts",
  authentication("user"), // Middleware to ensure the user is authenticated
  async (req: Request, res: Response) => {
    const id: string = req.user.userId; // Extracting the user's ID from the request
    const limit: number = parseInt(req.query.limit as string) || 10; // Limit for the number of posts to fetch
    const lastPostId: string | undefined = req.query.lastPostId as string; // ID of the last post loaded for pagination

    try {
      // Constructing a query to fetch posts by the user
      let query: any = { user: id };

      // If 'lastPostId' is provided, add it to the query to fetch posts older than the lastPostId
      if (lastPostId) {
        query._id = { $lt: lastPostId };
      }

      // Fetching posts from the database based on the constructed query
      // Posts are sorted by creation date in descending order and limited by the 'limit' value
      const posts = await PostModel.find(query)
        .populate("user", "userName") // Populating the 'user' field with 'userName'
        .sort({ createdAt: -1 }) // Sorting posts by creation date
        .limit(limit); // Applying the limit to the number of posts

      // Sending the fetched posts as a response
      res.json(posts);
    } catch (error) {
      // Handling any errors during the database operation
      console.error("Error fetching user posts:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
