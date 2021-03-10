import { Router } from 'express'
import userRouter from './user.routes'
import messageRouter from './message.routes'

const routes = Router()

routes.use('/user', userRouter)

routes.use('/message', messageRouter)

export default routes
