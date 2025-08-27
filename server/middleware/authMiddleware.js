import User from "../models/User.js"

// middleware to check if user is authenticated or not
export const authUser = async (req, res, next) => {
    const {userId} = req.auth
    if(!userId) {
        res.json({success: false, message: "Not Authorized"})
    } else {
        const user = await User.findById(userId)
        req.user = user
        next()
    }
}