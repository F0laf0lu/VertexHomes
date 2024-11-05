import { validationResult } from "express-validator"
import prisma from "../prisma.js"
import { BadRequestError} from "../utils/error.js"






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


export const updateAgentProfile = async (req, res)=>{
    const {license, location, agencyName} = req.body
    const {id} = req.user
    const updatedAgent = await prisma.agentProfile.update({
        where:{
            userId:id
        },
        data:{
            license, location, agencyName
        }
    })
    res.status(200).json({
        status: "success",
        message: "Agent profile updated successfully",
        data: updatedAgent
    })
}



// Start here when you open next
export const deleteProfile = async(req, res) => {
    const {id} = req.user
    const deleteAgent = await prisma.agentProfile.delete({
        where: {
            userId:id
        }
    })

    const deleteUser = await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            is_active:false
        }
    })


    res.status(200).json({
        status:"success",
        message:"profile deleted successfully",
        data: deleteUser,
        agent: deleteAgent
    })
}