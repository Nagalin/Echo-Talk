import http from 'http'
import express from 'express'
import { config } from 'dotenv'
config()

const app = express()
const PORT = process.env.PORT ?? 3000
const server = http.createServer(app)

server.listen(PORT,() => console.log(`Listening on port ${PORT}`))
