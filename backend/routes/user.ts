import express from 'express'
import { fetchProfile } from '../controllers/userController'
const router = express.Router()

router.get('/profile',fetchProfile)

export default router