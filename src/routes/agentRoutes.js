import express from "express";
import { createAgentProfile, updateAgentProfile } from "../controllers/agentControllers.js";
import {validateAgentProfile, validateAgentUpdate } from "../utils/validators.js";
import { authMiddleware } from "../middlewares/auth.js";



const router = express.Router()

router.use(authMiddleware)
router.post('/', validateAgentProfile, createAgentProfile)
// router.get('/:agentId', getAgentProfile)
router.patch('/update-profile/:agentId', validateAgentUpdate, updateAgentProfile)
router.delete('/:agentId')


export { router as agentRouter}

