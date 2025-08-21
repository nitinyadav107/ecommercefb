import express from "express"
 import { loginUser, registerUser, adminLogin, VerfiyEmail, googleAuth } from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/login",loginUser);
userRouter.post("/register",registerUser);
userRouter.post('/verifyemail',VerfiyEmail);
userRouter.post("/admin",adminLogin);
userRouter.get("/google",googleAuth);

export default userRouter;