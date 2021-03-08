import React from 'react'

import PropTypes from 'prop-types'

import { Container } from './styles'

export default function Button({ children, loading, ...rest }) {
  return (
    <Container {...rest} loading={loading}>
      {children}
    </Container>
  )
}

Button.defaultProps = {
  loading: false,
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  loading: PropTypes.bool,
}
