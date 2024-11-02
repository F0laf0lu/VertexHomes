import { validationResult } from "express-validator"
import prisma from "../utils/prisma.js"
import { BadRequestError } from "../utils/error.js"


export const createAgentProfile = async (req, res)=>{
    const {userId, license, location, agencyName} = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new BadRequestError([errors.array().map((err)=> err.msg)]);
    }
    const agentProfile = await prisma.agentProfile.create({
        data: {
            userId, 
            license, 
            location, 
            agencyName
        }
    })
    res.status(200).json({
        status: "success",
        message: "agent profile creation successful",
        data: agentProfile
    })
}



// User needs to be logged in to do this
export const updateAgentProfile = async (req,res)=>{

    const {userId, license, location, agencyName} = req.body

    const updateProfile = prisma.agentProfile

    res.statu(200).json({
        status: "success",
        message: "Agent profile updated successfully"
    })
}


export const deleteProfile = async(req, res)=>{

    res.status(200).json({
        status:"success",
        message:"profile deleted successfully"
    })
}