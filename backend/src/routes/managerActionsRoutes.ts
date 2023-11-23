import express, { Router } from "express";
import getUsers from "../controllers/manager/getUsers";
const router: Router = express.Router();
router.use("/", getUsers);
export default router;
