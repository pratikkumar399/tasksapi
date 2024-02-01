import { Router } from "express";
import { authenticateToken } from "../middleware/authenticate.middleware.js";
import { createSubTask, deleteSubTask, getSubTasks, updateSubTask } from "../controllers/subtask.controller.js";

const router = Router();

router.route("/create").post(authenticateToken, createSubTask);
router.route("/getsubtasks").get(authenticateToken, getSubTasks);
router.route("/update/:id").put(authenticateToken, updateSubTask);
router.route("/delete/:id").delete(authenticateToken, deleteSubTask);

export default router;