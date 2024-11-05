import { body, param } from "express-validator";
import prisma from "../prisma.js";
import { BadRequestError, CustomError, NotFoundError} from "./error.js";

const allowedRoles = ["USER", "AGENT", "ADMIN"];

export const validateRegister = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail()
        .custom(async (value)=>{
                const userEmail = await prisma.user.findUnique({
                    where: {
                        email: value
                    }
                })
                if (userEmail) {
                    throw new Error("E-mail already in use");
                };
            }),

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


export const validateAgentProfile = [
    body('license')
        .trim()
        .notEmpty().withMessage("Please provide the license number")
        .matches(/^(\d{4}-){3}\d{4}$/g).withMessage('license format is invalid'),

    body('location')
        .optional()
        .trim()
        .isString().withMessage("Location should be a string"),

    body('agencyName')
        .trim()
        .notEmpty().withMessage("Please enter your agency name"),

    body('userId')
        .trim()
        .notEmpty().withMessage('Provide the user id')
        // check user id exists and role is agent
        .custom(async (value)=>{
                const agentUser = await prisma.user.findUnique({
                    where:{id:value}})
                    if (!agentUser) {
                        throw new NotFoundError("User does not exist");
                    }
                    if (agentUser.role !== 'AGENT') {
                        throw new CustomError("This user role is not an agent", 403)
                    }})
        // check profile has not been created before
        .custom(async (value) => {
            const agentProfile = await prisma.agentProfile.findUnique({
                where:{
                    userId:value
                }
            })
            if (agentProfile) {
                throw new CustomError("Agent profile exists already", 400);    
            }
        })
]


export const validateAgentUpdate = [
    body('license')
        .optional()
        .trim()
        .notEmpty().withMessage("Please provide the license number")
        .matches(/^(\d{4}-){3}\d{4}$/g).withMessage('license format is invalid'),

    body('agencyName')
        .optional()
        .trim()
        .notEmpty().withMessage("Please enter your agency name"),

    body('location')
        .optional()
        .trim()
        .isString().withMessage("Location should be a string"),

    param('agentId')
        .custom(async (value)=>{
            const agent = await prisma.agentProfile.findUnique({
                where:{
                    id:value
                }
            })
            if (!agent) {
                throw new NotFoundError("You need to be an agent to perform this action");
            }
        })
]


