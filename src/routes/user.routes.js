import { Router } from "express";
import { authenticateToken } from "../middleware/authenticate.middleware.js";
import { createUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/create").post(authenticateToken, createUser);
export default router;