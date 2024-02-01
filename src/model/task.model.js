import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        due_date: {
            type: Date,
            required: true,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high']
        },
        status: {
            type: String,
            enum: ['TODO', 'IN_PROGRESS', 'DONE'],
            default: 'TODO', // Default status when no subtask is finished
        },
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model('Task', taskSchema);
