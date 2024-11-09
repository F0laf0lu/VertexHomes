import { devLogger } from "../logger/devLogger.js";

export const errorHandler = (err, req, res, next)=>{
    devLogger.error(`Error occurred: ${err.message}`);
    devLogger.error(err.stack);

    let errStatus = err.statusCode || 500;
    let errMessage = err.message || "Internal Server Error"

    if (err.name === 'PrismaClientValidationError') {
        errStatus = 500
        errMessage = "Internal Server Error"
    }

    res.status(errStatus).json({
        success: false,
        status:errStatus,
        message:errMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}