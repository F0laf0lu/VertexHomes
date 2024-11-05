import express from "express";
import { createAgentProfile, getAgentProfile, updateAgentProfile } from "../controllers/agentControllers.js";
import {validateAgentProfile, validateAgentUpdate } from "../utils/validations.js";
import { authService } from "../middlewares/auth.js";



const router = express.Router()

router.use(authService)
router.post('/', validateAgentProfile, createAgentProfile)
router.get('/:agentId', getAgentProfile)
router.patch('/update-profile/:agentId', validateAgentUpdate, updateAgentProfile)
router.delete('/:agentId')


export { router as agentRouter}

