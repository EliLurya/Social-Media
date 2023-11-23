import express, { Router } from "express";
import newComments from '../controllers/comments/newComment'
const router: Router = express.Router();
router.use("/", newComments);
export default router;
