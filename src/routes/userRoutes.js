import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { deactivateUser, getUser, updateUser } from "../controllers/userControllers.js";


const router = Router();


router.use(authMiddleware)

router.get('/:userId', getUser)
router.patch('/:userId', updateUser)
router.delete('/:userId', deactivateUser)


export {router as userRoutes}