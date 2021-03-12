import React, { useRef, useState, useEffect } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'

import pt from 'date-fns/locale/pt-BR'
import { useField } from '@unform/core'
import PropTypes from 'prop-types'

import { FaRegCalendarAlt } from 'react-icons/fa'
import { Container } from './styles'

const DatePicker = ({ name, dateFormat, disabled, ...rest }) => {
  registerLocale('pt', pt)

  const datepickerRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const [date, setDate] = useState(defaultValue || null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref) => {
        ref.clear()
      },
    })
  }, [fieldName, registerField])

  return (
    <Container error={error} disabled={disabled}>
      <div>
        <span>
          <FaRegCalendarAlt />
        </span>
        <ReactDatePicker
          error={error}
          disabled={disabled}
          autoComplete="off"
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          locale="pt"
          dateFormat={dateFormat || 'dd/MM/yyyy'}
          {...rest}
        />
      </div>
    </Container>
  )
}

export default DatePicker

DatePicker.defaultProps = {
  dateFormat: 'dd/MM/yyyy',
  disabled: false,
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
}
