import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const generaeToken = (id: mongoose.Types.ObjectId, tokenType: 'ACCESS' | 'REFRESH') => {
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
    if(!ACCESS_TOKEN_KEY || ! REFRESH_TOKEN_KEY) throw new Error('Access token key and refresh token key are required in env file')
   
    const tokenExpirationTime = tokenType === 'ACCESS'? '5s':  '30d'
    const key = tokenType === 'ACCESS'? ACCESS_TOKEN_KEY:  REFRESH_TOKEN_KEY;
    const token = jwt.sign({id: id},key,{expiresIn: tokenExpirationTime})

    return token
}

export default generaeToken