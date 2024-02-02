// voiceCallScheduler.js
import schedule from 'node-schedule';
import { Task } from '../model/task.model.js';
import twilio from 'twilio';
import { User } from '../model/user.model.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const twilioClient = twilio(accountSid, authToken);

// Function to make a voice call
const makeVoiceCall = async (phoneNumber) => {
    try {
        const call = await twilioClient.calls.create({ to: phoneNumber, from: '+16592185845', url: 'your_voice_url' });
        console.log(`Voice call made to ${phoneNumber}, Call SID: ${call.sid}`);
        return call.sid; // Return the call SID
    } catch (error) {
        console.error('Error making voice call:', error);
        return null;
    }
};

// Function to check the status of a voice call
const checkVoiceCallStatus = async (callSid) => {
    try {
        const call = await twilioClient.calls(callSid).fetch();
        console.log(`Call SID: ${call.sid}, Status: ${call.status}`);
        return call.status; // Return the call status
    } catch (error) {
        console.error('Error checking voice call status:', error);
        return null;
    }
};

// Function to get users by priority
const getUsersByPriority = async (priority) => {
    try {
        const users = await User.find({ priority });
        return users;
    } catch (error) {
        console.error('Error fetching users by priority:', error);
        return [];
    }
};

// Function to schedule voice calls based on task due dates and user priorities
const scheduleVoiceCalls = () => {
    // Schedule the job to run every 5 minutes
    schedule.scheduleJob('*/5 * * * *', async () => {
        const overdueTasks = await Task.find({ due_date: { $lt: new Date() }, status: 'TODO' })
            .populate('user_id')
            .sort({ 'user_id.priority': 1 }).maxTimeMS(20000);

        for (const task of overdueTasks) {
            console.log(`Processing overdue task: ${task.title}`);
            const users = await getUsersByPriority(task.user_id.priority);

            for (const user of users) {
                // Make voice call to each user in priority order
                const callSid = await makeVoiceCall(user.phone_number);

                if (callSid) {
                    // Check the status of the voice call
                    const callStatus = await checkVoiceCallStatus(callSid);

                    // Check if the user attended the call based on the status
                    if (callStatus === 'completed' || callStatus === 'in-progress') {
                        console.log('User attended the call. Skipping further calls for this task.');
                        break;
                    }
                }
            }
        }
    });
};

scheduleVoiceCalls();

// Export the function to be used in app.js or wherever needed
export { scheduleVoiceCalls };
