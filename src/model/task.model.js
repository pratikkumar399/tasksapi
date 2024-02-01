import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        this: String,
        required: true,
    },
    description: {
        this: String,
        required: true,
    },
    due_date: {
        this: Date,
        required: true,
    },
});

export const Task = mongoose.model('Task', taskSchema);