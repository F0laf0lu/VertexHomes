import prisma from "../prisma.js";



export const createListingService = (async(listingData)=>{
    const newListing = await prisma.listing.create({
        data: listingData
    });
    return newListing;
})
