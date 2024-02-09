import { Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import Chat from "../models/Chat";

//@description      access a chat or create a new chat if not exist
//@route            GET /chat/:id
//@access           proctected
export const accessChat = async (req: AuthRequest, res: Response) =>{
    try {
        const existChat = await Chat.findOne({
            $or: [
                {users: [req.id, req.params.id]},
                {users: [req.params.id,req.id, ]}

            ]
            
        },"_id")
        if(existChat) return res.status(200).send(existChat)

        const newChat = await Chat.create({
            users: [req.id, req.params.id]
        })
        res.status(200).send(newChat)
        
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error')
    }
}