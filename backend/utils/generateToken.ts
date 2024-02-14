import mongoose from "mongoose";
import { config } from "dotenv"
import jwt from 'jsonwebtoken'
config()

const generateToken = (id: mongoose.Types.ObjectId, 
    tokenType: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') => {

        const expirationTime = tokenType === 'ACCESS_TOKEN' ? '5s' : '1d'
        const secretKey = tokenType === 'ACCESS_TOKEN' ?
         process.env.ACCESS_TOKEN_KEY : process.env.REFRESH_TOKEN_KEY

         if(!secretKey) throw new Error('Access token key and refresh token key are requried in env file')

         return jwt.sign({ id }, secretKey, {expiresIn: expirationTime})
}

export default generateToken