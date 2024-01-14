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
    const userId = req.user.userId; // Retrieve the user ID from the authenticated user
    const { id } = req.body;
console.log("here");

    if (!id) {
      res
        .status(404)
        .json({ success: false, error: "Send to the body ID post" });
      return;
    }

    const findPost = await PostModel.findOne({ _id: id }).populate(
      "user",
      "userName"
    );
    if (!findPost) {
      return res.status(404).json({ success: false, error: "post not found" });
    }

    // Determine if the user has liked the post
    const userLiked = findPost.idPeopleThatLike.includes(userId);

    // Prepare the response with like status and likes count
    const postResponse = {
      ...findPost.toObject(),
      userLiked: userLiked,
      likes: findPost.idPeopleThatLike.length, // Number of likes
    };
    
    res.json(postResponse);
  }
);

export default router;
