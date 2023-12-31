import express, { Router } from "express";
import userPosts from "../controllers/posts/userPosts";
import newPost from "../controllers/posts/newPost"
import updatePost from "../controllers/posts/updatePost"
import removePost from "../controllers/posts/removePost";
import feedRoutes from "../controllers/posts/feedRoutes";
import getPost from "../controllers/posts/getPost";

const router:Router = express.Router();
//All opretion of post
router.use("/", userPosts);
router.use("/", newPost)
router.use("/", updatePost);
router.use("/", removePost)
router.use("/", feedRoutes);
router.use("/", getPost)
export default router;
