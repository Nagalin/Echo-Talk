import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken";
import extractTokenFromHeaders from "../utils/extractTokenFromHeader";
import jwt ,{ JwtPayload} from 'jsonwebtoken'
import {config} from 'dotenv'
import AuthRequest from "../interfaces/AuthRequest";
config()

//@description    register a new user's to database
//@route          /register
//@access         public
export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const image = req.file?.filename
    if (!username || !password || !image) {
        return res.status(400).send('Username,password and image are required')
    }

    try {
        const existUser = await User.findOne({username})
        if(existUser) return res.status(409).send('Username is already in used')

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username: username,
            password: hashedPassword,
            picName: image
        })

        res.status(201).send('Your account have been created')

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error')

    }
}

//@description    Authenticate user's credentials
//@route          /login
//@access         public
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).send('Usernane and password are required')

    try {
        const user = await User.findOne({ username })

        if (!user || !(await bcrypt.compare(password, user.password!))) {
            return res.status(401).send('Invalid username or password')
        }

        const accessToken = generateToken(user._id, 'ACCESS_TOKEN')
        const refreshToken = generateToken(user._id, 'REFRESH_TOKEN')

        res.cookie('access-token', accessToken ,{httpOnly: true})
        res.cookie('refresh-token', refreshToken ,{httpOnly: true})
        res.status(200).end()

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal server error')

    }
}

//@description    get a new access token when an old one expired with valid refresh token
//@route          /access-token
//@access         public
export const getNewAccessToken = async (req: AuthRequest, res: Response) => {
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
    if(!REFRESH_TOKEN_KEY) throw new Error('Refresh token key is required in env file')

    const cookiesHeader = req.headers.cookie
    if(!cookiesHeader) return res.status(400).send('Cookies header are required')

    const refreshToken = extractTokenFromHeaders(cookiesHeader,'refresh-token')
    jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (error, decoded) => {
        if(error) return res.status(403).send('Invalid refresh token')

        decoded = decoded as JwtPayload
        const id = decoded.id

        const accessToken = generateToken(id,'ACCESS_TOKEN')
        res.cookie('access-token', accessToken, {httpOnly: true})
        res.status(200).end()
    })

}