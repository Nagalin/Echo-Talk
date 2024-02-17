import express from 'express'
import { accessChat, fetchChat } from '../controllers/chatControler'
const router = express.Router()

router.get('/chat',fetchChat)
router.get('/chat/:id',accessChat)

export default router

