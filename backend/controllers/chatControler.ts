import { Response } from 'express'
import AuthRequest from '../interfaces/AuthRequest'
import Chat from '../models/Chat'

//@description   access a chat or create a new one if not exists
//@route          GET/chat/:id
//@access         protected
export const accessChat = async (req: AuthRequest, res: Response) => {
    const senderId = req.id
    const recieverId = req.params.id

    const chat = await Chat.findOne({
        users: { $all: [senderId, recieverId] }
    })

    if (!(!!chat)) {
        const newChat = await Chat.create({
            users: [senderId, recieverId]

        })

        return res.status(200).send(newChat)
    }

    return res.status(200).send(chat)

}

//@description  fetch a last message for each chat
//@route          GET/chat
//@access         protected
export const fetchChat = async (req: AuthRequest, res: Response) => {
    const senderId = req.id

    try {
        const chat = await Chat.find({ users: { $in: [senderId] } },
            '-users -__v')
            .sort({updatedAt: -1})
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'reciever sender',
                    select: '_id username picName'
                },
                
            })
           
        if (!(!!chat)) {
            return res.status(404).json({ message: 'Chat not found' })
        }

        return res.status(200).json(chat)
    } catch (error) {
        console.error('Error fetching chat:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}