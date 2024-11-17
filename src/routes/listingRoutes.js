import { Router } from "express";
import listingValidator from "../validators/listingValidators.js";
import { createlisting } from "../controllers/listingControllers/createListing.js";
import { authMiddleware } from "../middlewares/auth.js";



const router = Router()

router.use(authMiddleware)
router.post('/create', listingValidator, createlisting)
// router.delete('/delete/:listingId', deleteListing)
// router.patch('/:listingId', updateListing)
// like listing
// bookmark listing


export {router as listingRoutes}