import 'express-async-errors'
import express from "express";
import prisma from "./utils/prisma.js";
import { userRouter } from "./routes/authRouter.js";
import config from "./config.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";

import dotenv from 'dotenv'
import { agentRouter } from './routes/agentRoutes.js';

dotenv.config()


const app = express();

app.use(express.json())
app.use('/api/auth', userRouter)
app.use('/api/users/agents', agentRouter)

app.all('*', (req, res)=>{
    res.status(404).json({
        status:"failed",
        message: `Cannot ${req.method} ${req.originalUrl}. Not found`    
    })
})

app.use(errorHandler)



const start = async ()=>{
    try {
        await prisma.$connect();
        console.log('Database connection successful')
        app.listen(config.port, ()=> {
            console.log(`Server running on port ${config.port}`)
        })
    } catch (error) {
        console.error(error);
        await prisma.$disconnect(); 
        process.exit(1);
    }
}

start()

