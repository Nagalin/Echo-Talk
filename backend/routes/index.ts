import express from 'express'
import authRoute from './auth'
import userRoute from './user'
import chatRoute from './chat'
import isAuthenticated from '../middlewares/isAuthenticated'
const router = express.Router()

router.use(authRoute)
router.use(isAuthenticated)
router.get('/auth',(req,res) => res.status(200).end())
router.use(userRoute)
router.use(chatRoute)

export default router