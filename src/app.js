import express from "express";
import prisma from "./utils/prisma.js";


import dotenv from 'dotenv'
dotenv.config()


const app = express();

app.use(express.json())



app.all('*', (req, res)=>{
    res.status(404).json({
        status:"failed",
        message: `Route ${req.originalUrl} not found`    
    })
})


const PORT = 3000 || process.env.PORT

const start = async ()=>{
    try {
        await prisma.$connect();
        console.log('Database connection successful')
        app.listen(PORT, ()=> {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}

start()
