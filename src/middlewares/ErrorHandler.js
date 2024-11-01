export const errorHandler = (err, req, res, next)=>{
    console.log("Middleware error handling")
    console.error(err)

    let errStatus = err.statusCode || 500;
    let errMessage = err.message || "Internal Server Error"

    if (err.name === 'PrismaClientValidationError') {
        errStatus = 500
        errMessage = "Internal Server Error"
    }

    res.status(errStatus).json({
        status: "failed",
        status:errStatus,
        message:errMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}