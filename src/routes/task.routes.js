import { Router } from "express";
import { createTask } from "../controllers/tasks.controller.js";
import { authenticateToken } from "../middleware/authenticate.middleware.js";

const router = Router();

router.route("/create").post(authenticateToken, createTask);

export default router;