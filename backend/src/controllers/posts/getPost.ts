import express, { Request, Response, Router } from "express";
import { authentication } from "../../middleware/authMiddleware";
import { Post } from "../../types/postTypes";
const PostModel = require("../../models/postSchema");
const router: Router = express.Router();
const body_parser = require("body-parser");
const jsonParser = body_parser.json();

router.post(
  "/getPost",
  jsonParser,
  authentication("user"),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(id);

    if (!id) {
      res
        .status(400)
        .json({ success: false, error: "Send to the body ID post" });
      return;
    }
    const findPost: Post | null = await PostModel.findOne({ _id: id }).populate(
      "user",
      "userName",
    );
    if (!id) {
      return res.status(404).json({ success: false, error: "post not found" });
    }
    console.log(findPost);

    res.json(findPost);
  }
);
export default router;
