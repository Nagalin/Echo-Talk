import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt'
import generaeToken from "../utils/generateToken";

//@description      authenticate user credentials
//@route            POST /login
//@access           public
export const loginController = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).send('Username and password are required')
    
    try {
        
        const existUser = await User.findOne({username})
        if(!existUser || !(await bcrypt.compare(password,existUser.password))) {
            return res.status(401).send('Invalid username or password')
        }
    
        const accessToken = generaeToken(existUser._id,'ACCESS')
        const refreshToken = generaeToken(existUser._id,'REFRESH')

        console.log(accessToken)
        console.log(refreshToken)
    
        res.cookie('accessToken',accessToken)
        res.cookie('refreshToken',refreshToken)
        res.status(200).end()
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal server error')
    }
}

//@description      register new user to database
//@route            POST /register
//@access           public
export const registerController = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).send('Username and password are required')

    try {
        const existUser = await User.findOne({username})
    if(existUser) return res.status(409).send('Username is already in used')

    const hashedPassword = await bcrypt.hash(password,10)

    User.create({
        username: username,
        password: hashedPassword
    })
    return res.status(201).send('Your account have been created')
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal server error')
        
    }
    

}