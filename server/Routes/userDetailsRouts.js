import express from "express";
import { auth } from "../Middleware/auth.js";
import { userDetails } from "../Controllers/userController.js";
const userDetailsRouter = express.Router();

userDetailsRouter.get("/me", auth, userDetails);

export default userDetailsRouter;
