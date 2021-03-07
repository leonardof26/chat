import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './route'

import Main from '../pages/Main'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
    </Switch>
  )
}

export default Routes
