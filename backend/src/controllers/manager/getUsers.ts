import express, { Request, Response } from "express";
import UserModel from "../../models/userSchema";
import { authentication } from "../../middleware/authMiddleware";
import { User } from "../../types/userTypes";
import { codeError } from "../../utils/errorCodeServer/errorCodeServer";
const router = express.Router();

type RouteHandler = (req: Request, res: Response) => Promise<void>;

// Get all users
router.get(
  "/getAllUsers",
  authentication("manager"),
  async (req: Request, res: Response) => {
    try {
      const users: User[] = await UserModel.find();
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(codeError.InternalServerError).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// Get user by ID
router.get(
  "/getUser/:id",
  authentication("manager"),
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
      const user: User | null = await UserModel.findById(id);
      if (!user) {
        res.status(codeError.NotFound).json({ success: false, error: "User not found" });
        return;
      }
      res.json({ success: true, data: user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(codeError.InternalServerError).json({ success: false, error: "Internal Server Error" });
    }
  }
);

export default router;
