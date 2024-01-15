import express, { Request, Response, Router } from "express";
import { authentication } from "../../middleware/authMiddleware";
const PostModel = require("../../models/postSchema");
const router: Router = express.Router();
const body_parser = require("body-parser");
const jsonParser = body_parser.json();

router.post(
  "/getPost",
  jsonParser,
  authentication("user"),
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Post ID is required" });
    }

    try {
      const findPost = await PostModel.findOne({ _id: id }).populate(
        "user",
        "userName"
      );

      if (!findPost) {
        return res
          .status(404)
          .json({ success: false, error: "Post not found" });
      }
      // Determine if the user has liked the post

      const userLiked = findPost.idPeopleThatLike.includes(userId);

      // Check if the user making the request is the creator of the post
      const isCreator = findPost.user._id.toString() === userId;

      // Prepare the response with like status and likes count
      const postResponse = {
        ...findPost.toObject(),
        userLiked: userLiked,
        likes: findPost.idPeopleThatLike.length,
        isCreator: isCreator,
      };

      res.json(postResponse);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
