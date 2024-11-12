import express from "express";
import { createAgentProfile, deleteProfile, getAgentProfile, updateAgentProfile } from "../controllers/agentControllers.js";
import {validateAgentProfile, validateAgentUpdate } from "../validators/userValidators.js";
import { authMiddleware } from "../middlewares/auth.js";



const router = express.Router()

router.use(authMiddleware)
router.post('/', validateAgentProfile, createAgentProfile)
router.get('/:agentId', getAgentProfile)
router.patch('/:agentId', validateAgentUpdate, updateAgentProfile)
router.delete('/:agentId', deleteProfile)


export { router as agentRouter}

