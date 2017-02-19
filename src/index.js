/* @flow */

import React from 'react'
import App from './App'

if (typeof document !== 'undefined') {
  const BrowserAppContainer = require('./BrowserAppContainer').default
  const { Provider } = require('react-redux')
  const store = require('./store').default
  const {render} = require('react-dom')
  // Load offline plugin only on production
  process.env.NODE_ENV === 'production' && require('./offline')

  const { fetchToken } = require('./reducers/user')
  store.dispatch(fetchToken())

  render(
    <Provider store={store}>
      <BrowserAppContainer />
    </Provider>
  , document.getElementById('app'))
}

export default App
