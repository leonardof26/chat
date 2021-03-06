import { Router } from 'express'

import UserController from '../app/controllers/UserController'

const userRouter = Router()

userRouter.post('/', UserController.store)

export default userRouter
