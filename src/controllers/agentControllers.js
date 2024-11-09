import { validationResult } from "express-validator"
import prisma from "../prisma.js"
import { BadRequestError, NotFoundError, PermissionDeniedError} from "../utils/error.js"
import { deleteAgentProfileService, getAgentProfileService, updateAgentProfileService } from "../services/agentService.js"


export const getAgentProfile = async(req, res)=>{
    const {agentId} = req.params
    if (!agentId) {
        throw new BadRequestError("Provide agent id in the params");
        
    }
    const agent = await getAgentProfileService(agentId)

    if (!agent) {
        throw new NotFoundError("agent not found");
    };
    res.status(200).json({
        success:true,
        data: agent
    })
}



export const createAgentProfile = async (req, res)=>{
    // get userid from token and create the agent profile with it
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
    const {agentId} = req.params

    const user = await prisma.agentProfile.findUnique({
        where:{
            id:agentId,
            userId:id
        }
    })

    if (!user) {
        throw new PermissionDeniedError("You don't have permission to perform this action");
    }
    
    const updatedAgent = await updateAgentProfileService(agentId, license, location, agencyName)

    res.status(200).json({
        status: "success",
        message: "Agent profile updated successfully",
        data: updatedAgent
    })
}


export const deleteProfile = async(req, res) => {
    const {id} = req.user
    const {agentId} = req.params

    const user = await prisma.agentProfile.findUnique({
        where:{
            id:agentId,
            userId:id
        }
    })

    if (!user) {
        devLogger.warn(`Unauthorized access attempt by user ${id}`);
        throw new PermissionDeniedError("You don't have permission to perform this action");
    }

    const deleteuser = await deleteAgentProfileService(agentId, id)
    devLogger.info(`Account deactication attempt:  user ${id}`);

    res.status(200).json({
        status:"success",
        message:"profile deleted successfully",
    })
}