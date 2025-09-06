import express from "express"
import { short_urlController } from "../controllers/short_url.controller.js";
const shortUrlRouter = express.Router();

shortUrlRouter.post('/', short_urlController);

export default shortUrlRouter;

 
