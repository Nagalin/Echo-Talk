import { Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import User from "../models/User";

export const fetchUser = async (req: AuthRequest, res: Response) => {
    const { username } = req.params;
    const { id } = req;

    try {
        const users = await User.find({ 
            username: { $regex: `^${username}`, $options: 'i' }, 
            _id: { $ne: id } 
        },'-password -__v -picName');
    
        if(users.length === 0) return res.status(404).send('No users found')
    
        return res.status(200).send(users)
        
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error')
        
    }
    
    
   


};
