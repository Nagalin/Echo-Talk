import express from 'express'
import multer from 'multer'
import { loginController, registerController } from '../controllers/authController'
import multerOptions from '../configs/multer'
const router = express.Router()

const storage = multer.diskStorage(multerOptions);
const upload = multer({ storage: storage })

router.post('/login',loginController)
router.post('/register',upload.single('img'),registerController)

export default router