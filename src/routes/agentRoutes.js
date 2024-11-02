import express from "express";
import { createAgentProfile, updateAgentProfile } from "../controllers/agentControllers.js";
import { validateAgentProfile } from "../utils/validations.js";
import { authService } from "../middlewares/auth.js";



const router = express.Router()

router.use(authService)
router.post('/', validateAgentProfile, createAgentProfile)
router.patch('/update-profile', updateAgentProfile)


export { router as agentRouter}

