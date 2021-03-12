import * as Yup from 'yup'

import User from '../schemas/User'

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      birthDate: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { name, birthDate, email } = req.body

    const userAlredyLogged = req.connectedUsers[email]

    if (userAlredyLogged) {
      return res.status(401).json({ error: 'User already logged in' })
    }

    const userAlreadyExists = await User.find({ email })

    if (userAlreadyExists.length) {
      return res.json(userAlreadyExists[0])
    }

    const newUser = await User.create({
      name,
      birthDate,
      email,
    })

    return res.json(newUser)
  }
}

export default new UserController()
