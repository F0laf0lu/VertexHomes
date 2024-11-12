import express from "express";
import { forgotPassword, login, register, resendVerificationLink, resetPassword, verifyEmail } from "../controllers/authControllers.js";
import { resetPasswordValidate, validateRegister } from "../validators/userValidators.js";



const router = express.Router()


router.post('/register', validateRegister, register);
router.get('/verify/:token', verifyEmail);
router.post('/resend', resendVerificationLink);
router.post('/forgotpassword', forgotPassword);
router.post('/reset/:token', resetPasswordValidate, resetPassword)
router.post('/login', login)


export { router as authRoutes}