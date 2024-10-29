import express from "express";
import { PrismaClient } from "@prisma/client";

import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient();


const app = express();

app.use(express.json())



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
