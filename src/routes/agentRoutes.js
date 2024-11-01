
import express from "express";

import { createAgentProfile } from "../controllers/agentControllers.js";
import { validateAgentProfile } from "../utils/validations.js";


const router = express.Router()

router.post('/', validateAgentProfile, createAgentProfile)


export { router as agentRouter}

