import dotenv from 'dotenv'

dotenv.config()


export default {
    email_user: process.env.EMAIL_USER,
    email_password: process.env.email_password,
    email_port: process.env.EMAIL_PORT,
    email_host: process.env.EMAIL_HOST,

    jwt_secret: process.env.JWT_SECRET || 'my-secret-key',

    port: process.env.port || 5000,

    base_url: process.env.BASE_URL
} 
