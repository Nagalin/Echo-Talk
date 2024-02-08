import express from 'express'
import { fetchUser } from '../controllers/userController'
const router = express.Router()

router.get('/user/:username',fetchUser)

export default router