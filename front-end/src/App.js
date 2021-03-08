import React from 'react'

import { Router } from 'react-router-dom'
import Routes from './routes'
import history from './services/history'

import 'bootstrap/dist/css/bootstrap.min.css'

import GlobalStyle from './styles/global'

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyle />
    </Router>
  )
}

export default App
