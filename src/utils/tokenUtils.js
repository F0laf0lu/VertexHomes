import jwt from 'jsonwebtoken'
import config from '../config.js'

export const generateToken = (user)=>{
    const token = jwt.sign({
        // id: user.id, 
        email: user.email, role: user.role}, 
        config.jwt_secret, 
        { expiresIn: '1d'})

        return token;
}

export const verifyToken = (token)=>{
    const payload = jwt.verify(token, config.jwt_secret)
    return payload;
}
