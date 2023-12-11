import { authentication } from "../../middleware/authMiddleware";

const express = require("express");
const router = express.Router();
const PostModel = require("../../models/postSchema");

// Route to get all posts
router.get("/feed", authentication("user"), async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("user", "userName")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
