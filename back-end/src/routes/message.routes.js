import { Router } from 'express'

import MessageController from '../app/controllers/MessageController'
import ChatRoomsController from '../app/controllers/ChatRoomsController'

const messageRouter = Router()

messageRouter.get('/', MessageController.get)
messageRouter.post('/', MessageController.store)
messageRouter.post('/rooms', ChatRoomsController.get)

export default messageRouter
