import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const user = JSON.parse(localStorage.getItem('user'))

  const signed = user && user.name

  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/chat/" />
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}
