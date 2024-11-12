import { Router } from "express";
import listingValidator from "../validators/listingValidators.js";
import { createlisting } from "../controllers/listingControllers/createListing.js";



const router = Router()


// router.post('/', listingValidator, createlisting)
router.get('/', createlisting)




export {router as listingRoutes}