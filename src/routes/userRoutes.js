import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { deactivateUser, getUser, updateUser } from "../controllers/userControllers";


const router = Router();


router.use(authMiddleware)

router.get('/:userId', getUser)
router.patch('/:userId', updateUser)
router.delete('/:userId', deactivateUser)