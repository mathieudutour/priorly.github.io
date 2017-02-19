/* @flow */

import React from 'react'
import { NavigationActions, addNavigationHelpers, type NavigationState } from 'react-navigation/lib/react-navigation.web'

import App from './App'

function getAction (router, path, params) {
  let action = router.getActionForPathAndParams(path, params)
  if (action) {
    return action
  }
  const sections = path.split('/')
  if (sections.length === 2) {
    return NavigationActions.navigate({
      params: {
        owner: sections[0],
        repo: sections[1]
      },
      routeName: 'Repo'
    })
  }
  return NavigationActions.navigate({
    params: { path },
    routeName: 'NotFound'
  })
}

export default class NavigationContainer extends React.Component {
  state: NavigationState
  constructor (props) {
    super(props)
    const initialAction = getAction(App.router, window.location.hash.slice(2))
    this.state = App.router.getStateForAction(initialAction)
    if (initialAction.params) {
      this.state = App.router.getStateForAction(
        NavigationActions.setParams({
          key: this.state.routes[this.state.index].key,
          params: initialAction.params
        }),
        this.state
      )
    }
  }
  componentDidMount () {
    document.title = App.router.getScreenConfig({state: this.state.routes[this.state.index], dispatch: this.dispatch}, 'title')
    window.onpopstate = (e) => {
      e.preventDefault()
      const action = getAction(App.router, window.location.pathname.substr(1))
      if (action) this.dispatch(action)
    }
  }
  componentWillUpdate (props: any, state: any) {
    const {path} = App.router.getPathAndParamsForState(state)
    const uri = `#/${path}`
    if (window.location.pathname !== uri) {
      window.history.pushState({}, state.title, uri)
    }
    document.title = App.router.getScreenConfig({state: state.routes[state.index], dispatch: this.dispatch}, 'title')
  }
  dispatch = (action: any) => {
    const state = App.router.getStateForAction(action, this.state)

    if (!state) {
      return true
    }

    if (state !== this.state) {
      this.setState(state)
      return true
    }
    return false
  }
  render () {
    return <App navigation={addNavigationHelpers({state: this.state, dispatch: this.dispatch})} />
  }
  getURIForAction = (action: any) => {
    const state = App.router.getStateForAction(action, this.state) || this.state
    const {path} = App.router.getPathAndParamsForState(state)
    return `/${path}`
  }
  getActionForPathAndParams = (path: any, params: any) => {
    return App.router.getActionForPathAndParams(path, params)
  }
  static childContextTypes = {
    getActionForPathAndParams: React.PropTypes.func.isRequired,
    getURIForAction: React.PropTypes.func.isRequired,
    dispatchNavigation: React.PropTypes.func.isRequired
  };
  getChildContext () {
    return {
      getActionForPathAndParams: this.getActionForPathAndParams,
      getURIForAction: this.getURIForAction,
      dispatchNavigation: this.dispatch
    }
  }
}
