/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react'

import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { subYears } from 'date-fns'
import PropTypes from 'prop-types'
import { Form } from '@unform/web'

import { user } from '../../../../services/api/calls'

import { Container, Title, Body, BottomButtons } from './styles'

import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import DatePicker from '../../../../components/DatePicker'

function Register({ show, close, setLoading }) {
  const formRef = useRef(null)

  const schema = Yup.object().shape({
    name: Yup.string().required('Favor informar o nome de usuário'),
    email: Yup.string().email().required('Favor informar o email'),
    birth: Yup.date().required('Favor informar a data de nascimento'),
  })

  async function handleSubmit(data) {
    setLoading(true)

    try {
      await schema.validate(data, { abortEarly: false })

      const payload = {
        name: data.name,
        email: data.email,
        birthDate: data.birth.toISOString(),
      }

      const userData = await user.registerUser(payload)

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...userData.data,
          birth: userData.data.birthDate,
          isRegistered: true,
        })
      )

      close()
    } catch (error) {
      const validationErrors = {}

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message
        })
        formRef.current.setErrors(validationErrors)
      }
      if (error.response && error.response.status === 401) {
        toast.error('Usuário já está logado no chat')
      }

      toast.error('Erro ao cadastrar usuário, favor verifique seus dados')
    }

    setLoading(false)
  }

  return (
    <Container show={show} onHide={close} id="modal" size="lg" centered>
      <Title closeButton>
        <span>Registro de Usuário</span>
      </Title>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Body>
          <div>
            <label htmlFor="name">Nome Completo:</label>
            <Input name="name" id="name" placeholder="ex. Fulano Beltrano" />
          </div>

          <div>
            <div>
              <label htmlFor="email">Email:</label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="seu melhor email"
              />
            </div>
            <div>
              <label htmlFor="birth">Data de Nascimento:</label>
              <DatePicker
                name="birth"
                id="birth"
                maxDate={subYears(new Date(), 18)}
                minDate={subYears(new Date(), 100)}
              />
            </div>
          </div>
        </Body>

        <BottomButtons>
          <Button type="button" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" darken>
            Registrar
          </Button>
        </BottomButtons>
      </Form>
    </Container>
  )
}

export default Register

Register.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}
