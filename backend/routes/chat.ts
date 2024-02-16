import express from 'express'
import { accessChat, fetchChat } from '../controllers/chat'
const router = express.Router()

router.get('/chat',fetchChat)
router.get('/chat/:id',accessChat)

export default router

