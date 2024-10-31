import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import HTML_TEMPLATE from './mail-template';

dotenv.config();


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    auth: {
        user:process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD
    },
});


export const sendEmailVerification = async (userEmail,text,html)=>{
    
    const emailDetails = {
        from:process.env.EMAIL_USER,
        to:userEmail,
        text:text,
        html:html,
        subject:"Email verification link"
    }
    await transporter.sendMail(emailDetails);
};