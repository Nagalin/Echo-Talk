import { Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import User from "../models/User";

export const fetchProfile = async (req: AuthRequest, res: Response)=>{
    const id = req.id
    try {
        const user = await User.findOne({_id: id},'username picName _id')
        console.log(user)
        if(!user) return res.status(204).send('No user found')

        res.status(200).send(user)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal server error')
        
    }
   

 }