export const errorHandler = (err, req, res, next)=>{
    console.log("Middleware error handling")

    const errStatus = err.statusCode || 500;
    const errMessage = err.message || "Internal Server Error"

    res.status(errStatus).json({
        status: "failed",
        status:errStatus,
        message:errMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}