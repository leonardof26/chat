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

    const userAlreadyExists = User.find({ email })

    if (userAlreadyExists) {
      return res.json('User already exists')
    }

    await User.create({
      name,
      birthDate,
      email,
    })

    return res.json('user created')
  }
}

export default new UserController()
