import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/connect.js";


dotenv.config()
const app = express();

app.use(express.json())



const PORT = 3000 || process.env.PORT

const start = async ()=>{
    try {
        const sequelize = connectDB(process.env.DB_NAME, 
            process.env.DB_USERNAME, 
            process.env.DB_PASSWORD, 
            process.env.DB_HOST, 
            process.env.DB_PORT
        )
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        app.listen(PORT, ()=> {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Unable to start the server')
        console.error('Unable to connect to the database:', error);

    }
}


start()
