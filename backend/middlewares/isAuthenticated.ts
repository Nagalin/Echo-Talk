import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthRequest from "../interfaces/AuthRequest";
import { config } from "dotenv";
config()

const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
    if(!ACCESS_TOKEN_KEY) throw new Error('Access token key is requried in env file')

    const cookiesHeader = req.headers.cookie
    if(!cookiesHeader) return res.status(403).send('Cookies header are missing')

    let accessToken = ''
    const cookies = cookiesHeader.split('; ')
    cookies.map((cookie) => {
        let token = cookie.split('=')
        if(token[0] === 'accessToken') accessToken = token[1]
    })

    jwt.verify(accessToken,ACCESS_TOKEN_KEY,(err,decoded) => {
        if(err) return res.status(403).send('Invalid access token')
        decoded = decoded as JwtPayload
        req.id = decoded.id
        return next()
    })

}

export default isAuthenticated