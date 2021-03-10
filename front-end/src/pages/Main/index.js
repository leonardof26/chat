import React, { useState, useRef, useEffect } from 'react'

import * as Yup from 'yup'
import { Form } from '@unform/web'
import { io } from 'socket.io-client'
import history from '../../services/history'

import { messages } from '../../services/api/calls'

import logo from '../../assets/Images/logo.png'

import { Container, Menu } from './styles'

import Button from '../../components/Button'
import Input from '../../components/Input'

function Main() {
  const [loading, setLoading] = useState(false)

  const formRef = useRef(null)

  const schema = Yup.object().shape({
    username: Yup.string().required('Favor informar o nome de usuário'),
  })

  async function handleSubmit(data) {
    setLoading(true)

    try {
      await schema.validate(data, { abortEarly: false })

      history.push('/chat')
    } catch (error) {
      const validationErrors = {}

      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message
      })

      formRef.current.setErrors(validationErrors)
    }

    setLoading(false)
  }

  async function teste() {
    await messages.getRoomMessages({ room: 'coisa' })
  }

  useEffect(() => {
    const socket = io('http://localhost:3333/')

    teste()

    socket.on('coisa', () => {
      console.log('jjjjj')
    })

    console.log(socket)
  }, [])

  return (
    <Container>
      <Menu>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <div>
            <strong>SEU NOME/APELIDO</strong>
            <Input name="username" placeholder="Seu melhor apelido" />
          </div>

          <div>
            <Button type="submit" darken big>
              {loading ? 'Carregando...' : 'Entrar no sistema'}
            </Button>
          </div>
        </Form>
      </Menu>
    </Container>
  )
}

export default Main
