import express from 'express'
import authRoute from './auth'
import userRoute from './user'
import authUser from '../middlewares/authUser'
const router = express.Router()

router.use(authRoute)
router.use(authUser)
router.use(userRoute)

export default router