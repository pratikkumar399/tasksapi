import { Task } from "../model/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
    // extract task details from request body
    const { title, description, due_date } = req.body;

    // Create a new task instance using the Task model
    const newTask = new Task({ title, description, due_date });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Respond with a success message
    res.status(201).json({ message: 'Task created successfully', task: savedTask });

})

export { createTask };