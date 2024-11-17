import { validationResult } from "express-validator";
import { createListingService } from "../services/listingService.js";
import { BadRequestError, NotFoundError, PermissionDeniedError } from "../utils/error.js";
import { getAgentProfileService } from "../services/agentService.js";
import prisma from "../prisma.js";



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
    if(req.body.propertyType=='RESIDENTIAL'){
        if (!req.body.bedrooms || !req.body.bathrooms) {
            throw new BadRequestError("Provide number of bathrooms and bathrooms for residential property type");
        }
    }
    if (req.body == 'LAND') {
        if (!req.body.squareFeet) {
            throw new BadRequestError("Provide Square feet for land property type");
        }
    }
    const listing = await createListingService(req.body, agent.id) 
    res.status(200).json({
        success: true,
        message:"Listing created successfully",
        data: listing
    })
})


export const deleteListing = async(req, res)=>{
    const {id} = req.user
    const {listingId} = req.params
    const agent = await prisma.agentProfile.findUnique({
        where:{
            userId: id
        }
    })
    if (!agent) {
        throw new NotFoundError("Agent not found");
    }
    const listing = await prisma.listing.findUnique({
        where:{ 
            id:listingId
        }
    })
    if (!listing) {
        throw new NotFoundError("Listing not found")
    }

    if(listing.agentId !== agent.id){
        throw new PermissionDeniedError("Permission denied")
    }
    await prisma.listing.delete({
        where:{
            id: listingId
        }
    })

    res.status(200).json({
        success: true,
        message: 'listing deleted'
    })
}