import express from 'express'
import { fetchProfile, fetchUser } from '../controllers/userController'
const router = express.Router()

router.get('/profile',fetchProfile)
router.get('/user/:username',fetchUser)

export default router