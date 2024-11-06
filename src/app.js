import 'express-async-errors'
import express from "express";
import prisma from "./prisma.js";

import config from "./config.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import dotenv from 'dotenv'
import { agentRouter } from './routes/agentRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { authRoutes } from './routes/authRoutes.js';

dotenv.config()


const app = express();

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/users/agents', agentRouter)

app.use(errorHandler)


app.all('*', (req, res)=>{
    res.status(404).json({
        status:"failed",
        message: `Cannot ${req.method} ${req.originalUrl}. Not found`    
    })
})


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

