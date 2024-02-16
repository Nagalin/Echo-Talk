import { Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import User from "../models/User";

//@description    fetch user's profile for auth context
//@route          GET/user
//@access         protected
export const fetchProfile = async (req: AuthRequest, res: Response)=> {
    const id = req.id
    try {
        const user = await User.findOne({_id: id},'username picName _id')
        if(!user) return res.status(204).send('No user found')

        res.status(200).send(user)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal server error')
        
    }
   

}

export const fetchUser = async (req: AuthRequest, res: Response) => {
    const username = req.params.username
    const myId = req.id

    const user = await User.find({
        $and:[
            {username: {$regex: username}},
            {_id: {$ne: myId}}
        ]
    },'-picName -password -__v')

    res.status(200).send(user)

}