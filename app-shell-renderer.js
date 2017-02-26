import React from 'react'
import {StyleSheetServer} from 'aphrodite'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

module.exports = function (appPath, reducerPath) {
  const App = require(appPath).default
  const context = {}
  let component = React.createElement(
    StaticRouter,
    { location: '/priorly/priorly.github.io', context },
    React.createElement(App, {})
  )
  if (reducerPath) {
    const { createStore, combineReducers } = require('redux')
    const rootReducers = require(reducerPath)
    const store = createStore(combineReducers(rootReducers))
    component = React.createElement(
      Provider,
      {store},
      component
    )
  }

  return StyleSheetServer.renderStatic(function () {
    return ReactDOMServer.renderToString(component)
  })
}
