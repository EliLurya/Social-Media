import express, { Request, Response, Router } from "express";
const router: Router = express.Router();
const body_parser = require("body-parser");
const jsonParser = body_parser.json();
import { authentication } from "../../../middleware/authMiddleware";
import { deleteUserAndRelatedData } from "./deleteUserAndRelatedData";
router.delete(
  "/deleteUser",
  jsonParser,
  authentication("admin"),
  async (req: Request, res: Response) => {
    const userId = req.user.userId; 

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }

    try {
      await deleteUserAndRelatedData(userId);
      res.status(200).json({
        success: true,
        message: "User and all related data successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting user and related data:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
