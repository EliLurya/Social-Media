import express, { Request, Response, Router } from "express";
import UserModel from "../../models/userSchema";
import { User } from "../../types/userTypes";
import { authentication } from "../../middleware/authMiddleware";
import { codeError } from "../../utils/errorCodeServer/errorCodeServer";

const body_parser = require("body-parser");
const jsonParser = body_parser.json();
const PostModel = require("../../models/postSchema");
const router: Router = express.Router();

// New post route
router.post(
  "/newPost",
  jsonParser,
  authentication("user"), // Apply authentication middleware for user access
  async (req: Request, res: Response) => {    
    const userId: string = req.user.userId; // Get user ID from authenticated request
    const { text, imageUrl } = req.body;    
    
    if (!text && !imageUrl) {
      res
        .status(codeError.BadRequest)
        .json({ success: false, error: "Send to the body post" });
      return;
    }
    try {
      // Find the user by ID in the database
      const user: User | null = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res
          .status(codeError.NotFound)
          .json({ success: false, error: "User not found" });
      }

      // Create a new instance of PostModel and set its properties
      const newPost = new PostModel({
        user,
        text,
        imageUrl,
        likes: 0,
        idPeopleThatLike: [],
        comments: [],
        createdAt: new Date(),
      });

      // Save the new post to the database
      await newPost.save();

      // Add the new post to the user's "posts" array and save user changes
      user.posts.push(newPost._id);
      await user.save();

      res.json({
        success: true,
        data: newPost,
        message: "Create new post",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res
        .status(codeError.InternalServerError)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
