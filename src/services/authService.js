import prisma from "../prisma.js";
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from '../utils/tokenUtils.js'


export const createUser = async(firstname, lastname, email, password, role)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = role ? role.toUpperCase() : 'USER';
    const user = await prisma.user.create({
        data:{
            firstName:firstname,
            password: hashedPassword,
            lastName:lastname,
            email,
            role:userRole
        }
    });

    // send confirmation link for email verification
    const verifyToken = generateToken(user)
    const verifyLink = `http://localhost:${config.port}/api/verify/${verifyToken}`;

    return {user, verifyLink };
}


export const loginUser = async(email, password)=>{
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    const token = generateToken(user)
    
    return token
}


export const verifyUser = async(token)=>{

    try {
        const userPayload = verifyToken(token);
        if (!userPayload) return null;

        const user = await prisma.user.update({
            where: { id: userPayload.id },
            data: { is_verified: true },
        });
        return true;  
    } catch (error) {
        console.error(error);
        return false; 
    }
}

export const resendUserVerifyLink = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return "USER_NOT_FOUND";
    }

    if (user.is_verified) {
        return "USER_ALREADY_VERIFIED";
    }
    // Generate a new verification link
    const newVerifyLink = `http://localhost:${config.port}/api/auth/verify/${generateToken(user)}`;
    return newVerifyLink;
};


export const userForgotPassword = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return null;
    }

    // Generate the reset password link
    const resetLink = `http://localhost:${config.port}/api/auth/reset/${generateToken(user)}`;

    return resetLink;
};

export const resetUserPassword = async (token, password) => {
    try {
            const tokenUser = verifyToken(token);
            if (!tokenUser) {
                return null; 
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const updatedUser = await prisma.user.update({
                where: { id: tokenUser.id },
                data: { password: hashedPassword },
            });
            return updatedUser
    } catch (error) {
        console.error("Error resetting password:", error);
        return null;
    };
    
}