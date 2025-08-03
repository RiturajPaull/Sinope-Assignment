import express from "express";
import { login, logout, register } from "../Controllers/userController.js";
import { auth } from "../Middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
