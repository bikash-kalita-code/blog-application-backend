import * as express from "express";
const router = express.Router();
import { time } from "../controllers/blog.js";

router.get("/", time);

export { router };
