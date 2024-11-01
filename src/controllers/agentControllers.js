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