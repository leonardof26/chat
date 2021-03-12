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

const connectedUsers = {}

io.on('connection', (socket) => {
  const { room, user } = socket.handshake.query

  socket.on('join', (payload) => {
    const { room, user } = payload.query

    connectedUsers[user] = { socket: socket.id, room }
  })

  socket.on('enteredRoom', (payload) => {
    const { room, user } = payload.query

    for (const usr in connectedUsers) {
      if (connectedUsers[usr].room === room && user !== usr) {
        const loggedSocket = connectedUsers[usr].socket

        socket.to(loggedSocket).emit('connection', user || 'convidado')
      }
    }

    if (!user) return

    connectedUsers[user] = { socket: socket.id, room }
  })

  socket.on('exitedRoom', (payload) => {
    const { room, user } = payload.query

    if (!user) return

    for (const usr in connectedUsers) {
      if (connectedUsers[usr].room === room) {
        const loggedSocket = connectedUsers[usr].socket

        socket.to(loggedSocket).emit('desconnect', user)
      }
    }
  })

  connectedUsers[user] = { socket: socket.id, room }
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  next()
})
app.use(cors())
app.use(express.json())
app.use(routes)

export default server
