import { Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import Chat from "../models/Chat";

export const accessChat = async (req: AuthRequest, res: Response) => {
    const senderId = req.id
    const recieverId = req.params.id

    const chat = await Chat.findOne({
        users: {$all: [senderId,recieverId]}
    })

    if(!(!!chat)) {
        const newChat = await Chat.create({
            users: [senderId,recieverId]

        })

        return res.status(200).send(newChat)
    }

    return res.status(200).send(chat)

}