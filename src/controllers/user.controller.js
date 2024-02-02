import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
    const { phone_number, priority } = req.body;

    const newUser = new User({ phone_number, priority });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: savedUser });
});

export { createUser };




