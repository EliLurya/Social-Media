import express, { Router } from "express";
import signUp from "../controllers/users/signUp";
import signIn from "../controllers/users/signIn";
import resetPassword from "../controllers/users/resetPassword";
import signUpGoogle from "../controllers/users/signUpGoogle";
import checkHuth from "../controllers/users/checkAuth/checkauth"
import signOut from "../controllers/users/signOut"
const router: Router = express.Router();
//Sign-up
router.use("/", signUp);
//Sign-in
router.use("/", signIn);
//Reset password
router.use("/", resetPassword);
//Connect with Google
router.use("/", signUpGoogle);
//Check authorization
router.use("/", checkHuth)
// Logout
router.use("/", signOut)
export default router;
