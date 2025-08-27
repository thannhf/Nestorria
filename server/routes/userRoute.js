import express from "express"
import { authUser } from "../middleware/authMiddleware.js"
import { addRecentSearchCity, getUserProfile } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get('/', authUser, getUserProfile)
userRouter.post('/store-recent-search', authUser, addRecentSearchCity)

export default userRouter