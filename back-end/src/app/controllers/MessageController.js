import * as Yup from 'yup'

import Message from '../schemas/Message'

class MessageController {
  async get(req, res) {
    const schema = Yup.object().shape({
      room: Yup.string().required(),
    })

    console.log(req.io)
    // req.io.emit('coisa')

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

    await Message.create({
      content,
      room,
      userName,
      userEmail,
    })

    return res.json('Message Created')
  }
}

export default new MessageController()
