import * as express from "express";
const router = express.Router();
import { signup } from "../controllers/auth.js";

// validators
import { runValidation } from "../validators/index.js";
import { userSignupValidator } from "../validators/auth.js";

router.post("/signup", userSignupValidator, runValidation, signup);

export { router };
