import { createLogger, format, transports } from "winston";


const {combine, timestamp, printf} = format  

const logFormat = printf(({level, message, timestamp})=>{
    return `${timestamp} [${level.toUpperCase()}]: ${message}`
})

export const devLogger = createLogger({
    level: 'debug', 
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat, 
        format.colorize()
    ),
    transports: [
        new transports.Console(), // Log to console
        // new transports.File({ filename: 'logs/app.log' }) 
    ]
});
