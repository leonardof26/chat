import * as Yup from 'yup'

import Message from '../schemas/Message'

class MessageController {
  async get(req, res) {
    const schema = Yup.object().shape({
      room: Yup.string().required(),
    })

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { room } = req.query

    const messages = await Message.find({ room }).sort('createdAt')

    return res.json(messages)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
      room: Yup.string().required(),
      userName: Yup.string().required(),
      userEmail: Yup.string().email().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { content, room, userName, userEmail } = req.body

    const messageReg = await Message.create({
      content,
      room,
      userName,
      userEmail,
    })

    for (const usr in req.connectedUsers) {
      if (req.connectedUsers[usr].room === room) {
        const loggedSocket = req.connectedUsers[usr].socket

        req.io.to(loggedSocket).emit('messageReceived', messageReg)
      }
    }

    return res.json('Message Created')
  }
}

export default new MessageController()
