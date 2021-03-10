import * as Yup from 'yup'

import Message from '../schemas/Message'

class ChatRoomsController {
  async get(req, res) {
    const rooms = await Message.find().distinct('room')

    return res.json(rooms)
  }
}

export default new ChatRoomsController()
