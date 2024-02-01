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

});

const getTasks = asyncHandler(async (req, res) => {
    // Get all tasks from the database
    const { priority } = req.query;

    // Build the filter object based on the provided priority
    const filters = {};
    if (priority) filters.priority = priority;

    // Query tasks with the priority filter
    const tasks = await Task.find(filters);

    // Respond with the tasks
    res.status(200).json({ tasks });
});

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { due_date, status } = req.body;

    // Check if the task exists
    const existingTask = await Task.findById(id);
    if (!existingTask) {
        console.log(req.params);
        return res.status(404).json({ message: 'Not Found: Task not found' });
    }

    // Update the task due_date and status
    if (due_date) existingTask.due_date = due_date;
    if (status) existingTask.status = status;

    // Save the updated task to the database
    await existingTask.save();

    // Respond with success message
    res.status(200).json({ message: 'Task updated successfully' });
});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;

    // Check if the task exists
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
        return res.status(404).json({ message: 'Not Found: Task not found' });
    }

    // Update the task's deleted_at field
    existingTask.deleted_at = new Date();

    // Save the updated task to the database
    await existingTask.save();

    // Respond with success message
    res.status(200).json({ message: 'Task soft deleted successfully' });

});

export { createTask, getTasks, updateTask, deleteTask };