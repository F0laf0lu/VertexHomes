import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { generateToken, verifyToken } from '../utils/tokenUtils.js'
import config from '../config.js'
import { BadRequestError, ConflictError, CustomError, NotFoundError, UnauthorizedError } from '../utils/error.js'
import { createUser, loginUser, resendUserVerifyLink, resetUserPassword, userForgotPassword, verifyUser } from '../services/authService.js'
import { devLogger } from '../logger/devLogger.js'

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
    const {user, verifyLink} = await createUser(firstname, lastname, email,password, role)

    devLogger.info(`successful registration: ${user.id}`)

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
            id: user.id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            role: user.role,
        },
        emailVerifyLink: `Please click here to verify your email ${verifyLink}`
    });
}

export const login = async(req,res)=>{
    const {email, password} = req.body
    devLogger.info(`User login attempt: ${email}`);
    if (!email || !password) {
        throw new BadRequestError("Email and password required");
    }
    const token = await loginUser(email, password);
    if (!token) {
        devLogger.warn(`unsuccessful login attempt: ${email}`)
        throw new UnauthorizedError("Invalid email or password");
    }
    res.status(200).json({
        success: true,
        data: { token }
    })
}

export const verifyEmail = async (req, res) => {
    const {token} = req.params
    if (!token) {
        throw new BadRequestError("Token must be provided")
    }
    const verified = await verifyUser(token)

    if (!verified) {
        throw new UnauthorizedError("Invalid token or user not found");
    }
    res.status(200).json({
        status:"success",
        message:"User email has been successfully verified"
    })
}

export const resendVerificationLink = async (req, res)=>{
    const { userId } = req.body;

    if (!userId) {
        throw new BadRequestError("User ID is required");
    }
    const newVerifyLink = await resendUserVerifyLink(userId);

    if (result === "USER_NOT_FOUND") {
        throw new NotFoundError("User not found");
    }

    if (result === "USER_ALREADY_VERIFIED") {
        throw new ConflictError("User is already verified");
    }

    res.status(200).json({
        status: "success",
        message: "Verification link sent",
        data: { newVerifyLink },
    });
}

export const forgotPassword = async (req, res)=>{
    const { email } = req.body;

    if (!email) {
        throw new BadRequestError("You need to provide your email");
    }
    const resetLink = await userForgotPassword(email);

    if (!resetLink) {
        throw new NotFoundError("User with this email does not exist");
    }

    res.status(200).json({
        status: "success",
        message: "A reset password link has been sent to your email",
        data: { resetLink },
    });
}

export const resetPassword = async(req, res) => {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ 
            status: "failed",
            errors: errors.array().map((err) => err.msg),
        });
        return;
    }
    if (password !== confirmPassword) {
        throw new BadRequestError("Passwords do not match");
    }
    const updatedUser = await resetUserPassword(token, password);
    if (!updatedUser) {
        throw new UnauthorizedError("Invalid or expired token");
    }
    res.status(200).json({
        status: "success",
        message: "Password reset successfully",
    });
}