import 'dotenv/config'

import express from 'express'
import http from 'http'
import cors from 'cors'
import routes from './routes'
import socket from 'socket.io'

import './database'

const app = express('http')

const server = http.createServer(app)
const io = socket(server, { cors: { origin: '*' } })

app.use((req, res, next) => {
  req.io = io
  next()
})
app.use(cors())
app.use(express.json())
app.use(routes)

export default server
