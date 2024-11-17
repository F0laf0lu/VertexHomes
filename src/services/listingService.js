import prisma from "../prisma.js";



export const createListingService = (async(listingData, agentId)=>{
    if (!listingData.zipcode) {
        listingData.zipcode = 0
    }
    listingData.agentId = agentId
    const newListing = await prisma.listing.create({
        data: listingData
    });
    return newListing;
})
