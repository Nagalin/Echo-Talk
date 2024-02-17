import express from 'express'
import { accessChat, fetchChat } from '../controllers/chatControler'
import { fetchMessage } from '../controllers/messageController'
const router = express.Router()

router.get('/message/:id',fetchMessage)

export default router
