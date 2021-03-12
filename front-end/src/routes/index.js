import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './route'

import Main from '../pages/Main'
import Chat from '../pages/Chat'

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/chat/:chatRoom?" exact component={Chat} isPrivate />
    </Switch>
  )
}

export default Routes
