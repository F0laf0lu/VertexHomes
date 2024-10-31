import express from "express";
import { forgotPassword, register, resendVerificationLink, resetPassword, verifyEmail } from "../controllers/authControllers.js";
import { resetPasswordValidate, validateRegister } from "../utils/validate.js";



const router = express.Router()


router.post('/register', validateRegister, register);
router.get('/verify/:token', verifyEmail);
router.post('/resend', resendVerificationLink);
router.post('/forgotpassword', forgotPassword);
router.post('/reset/:token', resetPasswordValidate, resetPassword)




export { router as userRouter}