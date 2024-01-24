import express, { Router } from "express";
import signUp from "../controllers/users/signup/signUp";
import signIn from "../controllers/users/signIn";
import resetPassword from "../controllers/users/resetPassword";
import signUpGoogle from "../controllers/users/signup/signUpGoogle";
import checkHuth from "../controllers/users/checkAuth/checkAuth";
import signOut from "../controllers/users/signOut";
import refreshFireBaseToken from "../controllers/users/refreshFirebaseToken/refreshFireBaseToken";
import deleteUser from "../controllers/users/deleteUser/deleteUser";
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
router.use("/", checkHuth);
// Refresh Firebase token
router.use("/", refreshFireBaseToken);
// Logout
router.use("/", signOut);
// Delete user
router.use("/", deleteUser);

export default router;
