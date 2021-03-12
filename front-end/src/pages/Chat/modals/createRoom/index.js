/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react'

import { toast } from 'react-toastify'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Form } from '@unform/web'

import history from '../../../../services/history'

import { Container, Title, Body, BottomButtons } from './styles'

import Button from '../../../../components/Button'
import Input from '../../../../components/Input'

function CreateRoom({ show, close, addRoom, roomsList }) {
  const formRef = useRef(null)

  const schema = Yup.object().shape({
    roomName: Yup.string().required('Favor informar o nome da Sala'),
  })

  async function handleSubmit(data) {
    try {
      await schema.validate(data, { abortEarly: false })

      const roomAlreadyExists = roomsList.find((room) => room === data.roomName)

      if (roomAlreadyExists) {
        return
      }

      addRoom(data.roomName)
      history.push(`/chat/${data.roomName}`)
      close()
    } catch (error) {
      const validationErrors = {}

      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message
      })

      formRef.current.setErrors(validationErrors)

      toast.error('Erro ao criar nova sala')
    }
  }

  return (
    <Container show={show} onHide={close} id="modal" size="sm" centered>
      <Title>Criar Sala</Title>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Body>
          <label htmlFor="roomName">Nome Sala:</label>
          <Input
            name="roomName"
            id="roomName"
            placeholder="ex. Sala sobre WandaVision"
          />
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

export default CreateRoom

CreateRoom.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  addRoom: PropTypes.func.isRequired,
  roomsList: PropTypes.array.isRequired,
}
