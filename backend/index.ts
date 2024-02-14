import http from 'http'
import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import router from './routes'
import './configs/database'
import bodyParser from 'body-parser'
import corsOptions from './configs/cors'
config()

const app = express()
const PORT = process.env.PORT ?? 3000
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(router)

server.listen(PORT,() => console.log(`Listening on port ${PORT}`))
