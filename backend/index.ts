import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import corsOption from './configs/cors'
import router from './routes'
import './configs/database'
config()

const PORT = process.env.PORT ?? 3000
const app = express()
const server = http.createServer(app)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors(corsOption))
app.use(router)

server.listen(PORT,() => console.log(`Listening on port ${PORT}`))

