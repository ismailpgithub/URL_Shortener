import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import shortUrlRouter from "./src/routes/short_url.route.js";
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.route.js";
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

dotenv.config("./.env");
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(attachUser);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/create", shortUrlRouter);

app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
