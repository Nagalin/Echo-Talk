import express from 'express'
import authRoute from './auth'
import userRoute from './user'
import authUser from '../middlewares/authUser'
import chatRoute from './chat'
const router = express.Router()

router.use(authRoute)
router.use(authUser)
router.use(userRoute)
router.use(chatRoute)

export default router