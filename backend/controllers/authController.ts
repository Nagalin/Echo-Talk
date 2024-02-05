import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt'
import generaeToken from "../utils/generateToken";
import AuthRequest from "../interfaces/AuthRequest";
import jwt, { JwtPayload } from 'jsonwebtoken'
import {config} from 'dotenv'
config()

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
    const picName = req.file?.filename
    if(!username || !password) return res.status(400).send('Username and password are required')

    try {
        const existUser = await User.findOne({username})
    if(existUser) return res.status(409).send('Username is already in used')

    const hashedPassword = await bcrypt.hash(password,10)

    User.create({
        username: username,
        password: hashedPassword,
        picName: picName
    })
    
    return res.status(201).send('Your account have been created')
        
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal server error')
        
    }
    

}

export const refreshTokenController = async(req: AuthRequest, res: Response) =>{
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
    if(!REFRESH_TOKEN_KEY || ! ACCESS_TOKEN_KEY) {
        throw new Error('Access token key and refresh token key are requried in env file')
    }

    const cookiesHeader = req.headers.cookie
    if(!cookiesHeader) return res.status(403).send('Cookies header are missing')

    let refreshToken = ''
    const cookies = cookiesHeader.split('; ')
    cookies.map((cookie) => {
        let token = cookie.split('=')
        if(token[0] === 'refreshToken') refreshToken = token[1]
    })

    jwt.verify(refreshToken,REFRESH_TOKEN_KEY,(err,decoded) => {
        if(err) return res.status(403).send('Invalid access token')
        decoded = decoded as JwtPayload
        
       const accessToken = generaeToken(decoded.id,'ACCESS')
       res.cookie('accessToken',accessToken,{httpOnly: true})
       res.status(200).end()
    })

}