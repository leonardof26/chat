import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core'

import PropTypes from 'prop-types'

import { Container } from './styles'

export default function Input({ label, name, ...rest }) {
  const inputRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>

      <Container
        error={error}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        className={error ? 'error' : ''}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </>
  )
}

Input.defaultProps = {
  label: '',
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
}
