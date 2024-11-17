import { validationResult } from "express-validator";
import { createListingService } from "../../services/listingService.js";
import { BadRequestError, PermissionDeniedError } from "../../utils/error.js";



export const createlisting = (async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ 
            status:"failed",
            errors: errors.array().map((err)=> err.msg)
        })
        return;
    }
    const {id, role} = req.user
    if (role!== "AGENT") {
        throw new PermissionDeniedError("Permission denied. Not an agent")
    }
    const agent = await prisma.agentProfile.findUnique({
        where:{
            userId: id
        }
    })
    if (!agent) {
        throw new BadRequestError("Agent profile not found")
    }
    const listing = await createListingService(req.body, agent.id) 
    res.status(200).json({
        success: true,
        message:"Listing created successfully",
        data: listing
    })
})