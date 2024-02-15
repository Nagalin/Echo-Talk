import { NextFunction, Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import extractTokenFromHeaders from "../utils/extractTokenFromHeader";

const authUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
    if(!ACCESS_TOKEN_KEY) throw new Error('Access token key is required in env file')
    
    const cookiesHeader = req.headers.cookie
    
    if(!cookiesHeader) return res.status(401).send('Cookie header is missing')
    const accessToken = extractTokenFromHeaders(cookiesHeader,'access-token')
    jwt.verify(accessToken,ACCESS_TOKEN_KEY, (err,decoded) => {
        if(err) return res.status(403).send('Invalid access token')
        decoded = decoded as JwtPayload
        req.id = decoded.id
        next()
    })
}

export default authUser