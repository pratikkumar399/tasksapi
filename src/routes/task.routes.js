import { Router } from "express";
import { createTask } from "../controllers/tasks.controller.js";

const router = Router();

router.route("/create").post(createTask);


export default router;