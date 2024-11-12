import { body } from "express-validator";
import prisma from "../prisma.js";
import { BadRequestError } from "../utils/error.js";

const propertyTypes = ['RESIDENTIAL', 'COMMERCIAL', 'SPECIALPURPOSE', 'LAND'];
const listingStatus = ['ACTIVE', 'PENDING', 'CLOSED', 'CANCELLED']

const listingValidator = [
    body('agent')
        .trim()
        .notEmpty().withMessage("agent id is required")
        .custom(async(value)=>{
            const agent = await prisma.agentProfile.findUnique({
                where:{
                    id:value
                }
            });
            if(!agent){
                throw new BadRequestError("Agent not found (from listing validator)");
            }
        }),

    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),

     // Optional fields that need to be numeric
    body('squareFeet').optional().isNumeric().withMessage("square meter should be number"),
    body('yearBuilt').optional().isNumeric().withMessage("Year built should be a number")
        .custom((value)=>{
        const currentYear = new Date().getFullYear()
        if (value > currentYear || value < currentYear-15) {
            throw new BadRequestError("Year built cannot be more than current year or 15 years lower than current year")
        };
    }),

    body('bedrooms').optional().isNumeric().withMessage('Integer required for bedroom number'),
    body('bathrooms').optional().isNumeric().withMessage('Integer required for bathroom number'),

    // Enum validation
    body('propertyType').trim().notEmpty().withMessage('Property type required')    
        .custom(value => {
            if (!propertyTypes.includes(value)) {
                throw new BadRequestError('Invalid property type (from listing validator)');
                }
            return true;
            }),
    body('listingStatus').trim()       
        .custom(value => {
            if (!listingStatus.includes(value)) {
                throw new BadRequestError('Invalid listing status (from listing validator)');
                }
            return true;
            }),


    body('visitAvailable')
        .notEmpty().withMessage('Visit availability is required')
        .isBoolean().withMessage("Visit availability should be true or false"),
    
     // String validation for addresses
    body('street').trim().notEmpty().withMessage('Street is required').isString().withMessage('Street should be a string'),
    body('city').trim().notEmpty().withMessage('City is required').isString().withMessage('City should be a string'),
    body('state').trim().notEmpty().withMessage('State is required').isString().withMessage('State should be a string'),

    body('zipcode').optional().isNumeric().withMessage('Zip code should be a number')
]


export default listingValidator;