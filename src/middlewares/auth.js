
export const authService = (req, res, next)=>{
    console.log(req.url)

    // get the jwt token
    // Decode the token and get user details
    // Verify user is valid in the application
    next()
} 