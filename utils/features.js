import { User } from "@/models/user";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"

export const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "NextTodo"
    })
    console.log(`Database Connected on ${connection.host}`);
}

export const cookieSetter = (res, token, set) => {

    res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
        path: "/",
        httpOnly: true,
        maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0
    }))
}

export const generateToken = (_id) => {

    return jwt.sign({ _id }, process.env.JWT_SECRET)
}

export const checkAuth = async (req) => {
    const cookie = req.headers.cookie;

    if (!cookie) return null;

    const arr = cookie.split("=");

    const token = arr[arr.length - 1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded._id);
    return user
};

