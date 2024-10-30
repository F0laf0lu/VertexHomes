import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {prisma} from '../utils/prisma.js'

export const register = async(res, req)=>{

    try {
            const {firstname, password, lastname, email, role} = req.body
            if (!password) {
                res.status().json({})
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hash(password, salt);
            
            const newUser = await prisma.user.create({
                data:{
                    firstName:firstname,
                    password: hashedPassword,
                    lastName:lastname,
                    email,
                    role
                }
            })

            // send confirmation link for email verification
            
            res.status(201).json({
                status: 'success',
                message: 'user created successfully',
                data: {}
            })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "An error occured. Try again later"
        })
    }
}


export const verifyEmail = async(req, res)=>{

    const {email} = req.body
    
}