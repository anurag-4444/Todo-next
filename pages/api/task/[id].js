import { checkAuth, connectDB } from "../../../utils/features"
import { Task } from "../../../models/task"
import { asyncError, errorHandler } from "@/middlewares/error"
import { isValidObjectId } from "mongoose"

const handler = asyncError(async (req, res) => {

    await connectDB()
    const user = await checkAuth(req)

    if (!user) return errorHandler(res, 401, "Login First")

    const taskID = req.query.id;

    if (!isValidObjectId(taskID)) {
        return errorHandler(res, 400, "Invalid Task ID");
    }

    const task = await Task.findById(taskID)

    if (!task) return errorHandler(res, 400, "Task not found")

    if (req.method === "PUT") {

        task.isCompleted = !task.isCompleted

        await task.save()
        res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        })
    }
    else if (req.method === "DELETE") {
        await task.deleteOne()
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })
    }
    else {
        return errorHandler(res, 400, "This method is not available")
    }
})

export default handler