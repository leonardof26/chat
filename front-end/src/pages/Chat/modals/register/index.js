/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

import PropTypes from 'prop-types'
import { Form } from '@unform/web'

import { Container, Title, Body, BottomButtons } from './styles'

import Button from '../../../../components/Button'
import Input from '../../../../components/Input'

function register({ show, close }) {
  return (
    <Container show={show} onHide={close} id="modal" size="lg" centered>
      <Title closeButton>
        <span>Registro de Usuário</span>
      </Title>

      <Form>
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
              <Input
                name="birth"
                id="birth"
                type="date"
                placeholder="dd/mm/aaaa"
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

export default register

register.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
}
