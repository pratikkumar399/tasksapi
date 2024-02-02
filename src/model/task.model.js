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
        priority: {
            type: Number,
            default: 0,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


// cron logic for priority
taskSchema.pre('save', function (next) {
    const today = new Date();
    const dueDate = new Date(this.due_date);
    const differenceInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {
        this.priority = 0;
    } else if (differenceInDays === 1 || differenceInDays === 2) {
        this.priority = 1;
    } else if (differenceInDays >= 3 && differenceInDays <= 4) {
        this.priority = 2;
    } else {
        this.priority = 3;
    }

    next();
});

export const Task = mongoose.model('Task', taskSchema);
