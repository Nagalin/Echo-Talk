import express from 'express'
import { getNewAccessToken, login, register } from '../controllers/authController'
import upload from '../configs/multer'
const router = express.Router()

router.post('/login',login)
router.post('/register',upload.single('image'),register)
router.get('/access-token',getNewAccessToken)

export default router