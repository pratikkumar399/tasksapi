import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

export { createTask };