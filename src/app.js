import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// import routes

import tasks from './routes/task.routes.js';
import subtasks from './routes/subtasks.routes.js';
import users from './routes/user.routes.js';
import { scheduleVoiceCalls } from './utils/voiceScheduler.js';

app.use("/api/tasks", tasks);
app.use("/api/subtasks", subtasks);
app.use("/api/users", users);

scheduleVoiceCalls();


export { app };