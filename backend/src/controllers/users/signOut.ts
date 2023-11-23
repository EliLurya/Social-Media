import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

router.post("/signout", (req: Request, res: Response) => {
  res.clearCookie("token"); // Clear the authentication cookie
  res.json({ success: true, message: "Signed out successfully" });
});
export default router;