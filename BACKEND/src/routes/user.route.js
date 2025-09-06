import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllUserUrls } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/urls", authMiddleware, getAllUserUrls);

export default userRouter;
