import express, { Request, Response } from "express";
import { authentication } from "../../middleware/authMiddleware";
import PostModel from "../../models/postSchema";
import mongoose from "mongoose";

const router = express.Router();

/**
 * Route to get a paginated list of all posts.
 * It supports pagination through 'lastPostId' and limits the number of posts returned.
 */
router.get(
  "/feed",
  authentication("user"), // Middleware to ensure the user is authenticated
  async (req: Request, res: Response) => {
    // Parse 'limit' from query parameters or default to 10
    const limit: number = parseInt(req.query.limit as string) || 10;
     const userId: string = req.user.userId;
    // Parse 'lastPostId' from query parameters; it may be undefined
    const lastPostId: string | undefined = req.query.lastPostId as string;

    try {
      let query: any = {}; // Initialize an empty query object

      // If 'lastPostId' is provided, adjust the query to fetch posts older than 'lastPostId'
      if (lastPostId) {
        query._id = { $lt: lastPostId };
      }

      // Fetch posts from the database based on the query
      // Posts are populated with 'userName' from the 'user' field and sorted by creation date
      const posts = await PostModel.find(query)
        .populate("user", "userName")
        .sort({ createdAt: -1 })
        .limit(limit);

      const postsWithLikeStatus = posts.map((post) => {
        // Convert ObjectId to string for comparison
        const userLiked = post.idPeopleThatLike
          .map((id) => id.toString())
          .includes(userId);
        return {
          ...post.toObject(),
          userLiked,
        };
      });      
      // Send the fetched posts as a response
      res.json(postsWithLikeStatus);
    } catch (error) {
      // Handle any errors during the database query
      console.error("Error fetching posts:", error);
      res.status(500).send(error);
    }
  }
);

export default router;
