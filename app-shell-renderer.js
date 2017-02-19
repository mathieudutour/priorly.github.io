import React from 'react'
import {StyleSheetServer} from 'aphrodite'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { NavigationActions, addNavigationHelpers } from 'react-navigation/lib/react-navigation.web'

const ServerApp = (App) => React.createClass({
  childContextTypes: {
    getURIForAction: React.PropTypes.func.isRequired,
    getActionForPathAndParams: React.PropTypes.func.isRequired,
    dispatchNavigation: React.PropTypes.func.isRequired
  },
  getChildContext () {
    return {
      dispatchNavigation: this.props.navigation.dispatch,
      getURIForAction (action) {
        const state = App.router.getStateForAction(action)
        let { path } = App.router.getPathAndParamsForState(state)
        return `/${path}`
      },
      getActionForPathAndParams: App.router.getActionForPathAndParams
    }
  },
  render () {
    return React.createElement(
      App,
      { navigation: this.props.navigation }
    )
  }
})

module.exports = function (appPath, reducerPath) {
  const App = require(appPath).default
  const topNavigation = addNavigationHelpers({
    state: App.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' })),
    dispatch (action) { return false }
  })
  let component = React.createElement(
    ServerApp(require(appPath).default),
    { navigation: topNavigation }
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
