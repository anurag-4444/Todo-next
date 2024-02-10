export const errorHandler = (res, statusCode = 500, message = "Internal Server Error") => {
    return res.status(statusCode).json({
        success: false,
        message
    })
}

export const asyncError = (passedFunc) => async (req, res) => {
    try {
        return await Promise.resolve(passedFunc(req, res))
    } catch (err) {
        console.log(err);
        return errorHandler(res, 500, err.message)
    }
}