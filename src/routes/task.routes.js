import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/tasks.controller.js";
import { authenticateToken } from "../middleware/authenticate.middleware.js";

const router = Router();

router.route("/create").post(authenticateToken, createTask);
router.route("/gettasks").get(authenticateToken, getTasks);
router.route("/update/:id").put(authenticateToken, updateTask);
router.route("/delete/:id").delete(authenticateToken, deleteTask);

export default router;