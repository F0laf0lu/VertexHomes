import { UnauthorizedError } from "../utils/error.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authService = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Authorization details not provided or invalid");
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        throw new UnauthorizedError("Token is not provided");
    }
    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid or expired token");
    }
} 