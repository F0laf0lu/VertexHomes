import { body, param } from "express-validator";
import prisma from "./prisma.js";

export const uniqueEmail = body('email').custom(async (value)=>{
    const userEmail = await prisma.user()
    if (user) {
        throw new Error("This email has been used");
    };
})

const allowedRoles = ["USER", "AGENT", "ADMIN"];


export const validateRegister = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),

    body('firstname')
        .trim()
        .notEmpty().withMessage('firstname is required')
        .isLength({max: 255}).withMessage('firstname must be less than 255 characters').isAlpha().withMessage("firstname should include only letters"),

    body('lastname')
        .trim()
        .notEmpty().withMessage('lastname is required')
        .isLength({max: 255}).withMessage('lastname must be less than 255 characters')
        .isAlpha().withMessage("lastname should include only letters"),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min:6}).withMessage("Password must be at least 6 characters")
        .isLength({ max: 100 }).withMessage('Password must be less than 100 characters.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contaiin at least one lower case')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage("Password must contain at least one special character.").not().matches(/\s/).withMessage("Password cannot contain whitespace."),

    body('role')
        .optional()
        .custom((value)=>{
        if (value && !allowedRoles.includes(value)) {
            throw new Error("Invalid role for user");
        };
        return true; 
    })
]                             

export const resetPasswordValidate = [
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min:6}).withMessage("Password must be at least 6 characters")
        .isLength({ max: 100 }).withMessage('Password must be less than 100 characters.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contaiin at least one lower case')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage("Password must contain at least one special character.").not().matches(/\s/).withMessage("Password cannot contain whitespace."),



        
        // Still validate password are the same
        param('token')
            .notEmpty().withMessage('Token is required')
]