import { checkAuth, connectDB } from "../../utils/features"
import { Task } from "../../models/task"
import { asyncError, errorHandler } from "@/middlewares/error"

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST") return errorHandler(res, 400, "Only POST Method is allowed")

    const { title, description } = req.body

    if (!title || !description) return errorHandler(res, 400, "Please enter all the fields")   

    await connectDB()

    const user = await checkAuth(req)
    console.log("newTask ", user);
    if (!user) return errorHandler(res, 401, "Login First")

    await Task.create({
        title,
        description,
        user: user._id
    })

    res.json({
        success: true,
        message: "Task Created"
    })
})

export default handler