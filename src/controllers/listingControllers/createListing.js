import { createListingService } from "../../services/listingService.js";



export const createlisting = (async(req, res)=>{

    res.status(200).json({
        success: false,
        message:"Listing route accessed"
    })
})