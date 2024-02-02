import { Subtask } from "../model/subtask.model.js";
import { Task } from "../model/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createSubTask = asyncHandler(async (req, res) => {
    const { task_id } = req.body;

    // Check if the task_id is provided
    // Check if the referenced task exists
    // Create a new subtask
    // Save the subtask to the database
    // Respond with a success message


    if (!task_id) {
        return res.status(400).json({ message: 'Bad Request: task_id is required for creating a subtask' });
    }

    const existingTask = await Task.findById(task_id);
    if (!existingTask) {
        return res.status(404).json({ message: 'Not Found: Task with the provided task_id does not exist' });
    }

    const newSubtask = new Subtask({ task_id });
    const savedSubtask = await newSubtask.save();

    res.status(201).json({ message: 'Subtask created successfully', subtask: savedSubtask });
});


const getSubTasks = asyncHandler(async (req, res) => {
    // Get taskId from the query parameters
    // Build the filter object based on the provided task_id
    // If task_id is provided, add it to the filters object
    // Query subtasks with the task_id filter
    // Respond with the subtasks

    const { id } = req.query;

    const filters = {};
    if (id) filters.task_id = id;

    const subtasks = await Subtask.find(filters);

    res.status(200).json({ subtasks });

});

const updateSubTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the subtask exists
    const existingSubtask = await Subtask.findById(id);
    if (!existingSubtask) {
        return res.status(404).json({ message: 'Not Found: Subtask not found' });
    }

    // Update the subtask status
    existingSubtask.status = status;

    // Save the updated subtask to the database
    await existingSubtask.save();

    // Respond with success message
    res.status(200).json({ message: 'Subtask status updated successfully' });

});

const deleteSubTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if the subtask exists
    const existingSubtask = await Subtask.findById(id);
    if (!existingSubtask) {
        return res.status(404).json({ message: 'Not Found: Subtask not found' });
    }

    // Update the subtask's deleted_at field
    existingSubtask.deleted_at = new Date();

    // Save the updated subtask to the database
    await existingSubtask.save();

    // Respond with success message
    res.status(200).json({ message: 'Subtask soft deleted successfully', deleted_at: existingSubtask.deleted_at });
});

export { createSubTask, getSubTasks, updateSubTask, deleteSubTask };