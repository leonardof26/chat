import React from 'react'

import { FaSpinner } from 'react-icons/fa/'

import { Container } from './styles'

export default function LoadingPage() {
  return (
    <Container>
      <FaSpinner color="#ddd" size={40} />
    </Container>
  )
}
