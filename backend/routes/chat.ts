import express from 'express'
import { accessChat } from '../controllers/chat'
const router = express.Router()

router.get('/chat/:id',accessChat)

export default router

