import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { generateToken, verifyToken } from '../utils/tokenUtils.js'
import config from '../config.js'
import { BadRequestError, CustomError } from '../utils/error.js'

export const register = async(req, res)=>{

    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ 
            status:"failed",
            errors: errors.array().map((err)=> err.msg)
        })
        return;
    } 
    const {firstname, password, lastname, email, role} = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = role ? role.toUpperCase() : 'USER';
    const newUser = await prisma.user.create({
        data:{
            firstName:firstname,
            password: hashedPassword,
            lastName:lastname,
            email,
            role:userRole
        }
    })
    
    // send confirmation link for email verification
    const verifyToken = generateToken(req.body)
    const verifyLink = `http://localhost:${config.port}/api/verify/${verifyToken}`;
    res.status(201).json({
        status: 'success',
        message: 'user created successfully',
        data: req.body,
        emailVerifyLink: `Please click here to verify your email ${verifyLink}`
    })
}


export const verifyEmail = async(req, res)=>{
    const {token} = req.params
    if (!token) {
        throw new BadRequestError("Token must be provided")
    }

    const userPayload = verifyToken(token) 
    // Check for errors in jwt verification
    console.log(userPayload)
    
    //Then, find the user in the database and update is_verified to true
    res.status(200).json({
        status:"success",
        message:"User email has been successfully verified"
    })
}


export const resendVerificationLink = async (req, res)=>{
    const {userid} = req.body
    if (!userid) {
        throw new BadRequestError("userid is required");
    }
    // check userid is valid and does exist
    // get user from the database

    // sampple data
    const user = {
        email:"johndoe@gmail.com",
        role: "AGENT"
    }
    const newVerifyLink = `http://localhost:${config.port}/api/auth/verify/${generateToken(user)}`;
    res.status(200).json({
        status:"success",
        message: "Verification link sent",
        data: {newVerifyLink}
    })
}

export const forgotPassword = async (req, res)=>{
    const {email} = req.body
    if (!email) {
        throw new BadRequestError("You need to provide your email");
    }
    // find the email in the database
    const resetUser = {
        email:"johndoe@gmail.com",
        role: "AGENT"
    }
    // then send link
    const resetLink = `http://localhost:${config.port}/api/auth/reset/${generateToken(resetUser)}`
    res.status(200).json({
        status: "success",
        message: "A reset password link has been sent to your email",
        data: {resetLink}
    })
}


export const resetPassword = async(req, res) => {
    const {password, confirmPassword} = req.body
    const {token} = req.params
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ 
            status:"failed",
            errors: errors.array().map((err)=> err.msg)
        })
        return;
    }
    // verify the token
    const tokenUser = verifyToken(token)
    const salt = await bcrypt.genSalt(10)
    const newPassword = bcrypt.hash(password, salt)
    // update password of user in the database
    res.status(200).json({
        status:"success",
        message:"Password reset successfully"
    })
}