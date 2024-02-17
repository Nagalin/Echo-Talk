import { Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import Message from "../models/Message";

//@description    register a new user's to database
//@route          GET/message
//@access         public
export const fetchMessage = async (req: AuthRequest, res: Response) => {
    const senderId = req.id
    const recieverId = req.params.id
    console.log(senderId)
    console.log(recieverId)

    const message = await Message.find({
        $or: [{sender: senderId, reciever: recieverId}, {sender: recieverId,reciever: senderId}]
    })

    return res.status(200).send(message)

}