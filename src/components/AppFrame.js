/* @flow */

import React from 'react'
import {
  addNavigationHelpers,
  type NavigationNavigatorProps
} from 'react-navigation/lib/react-navigation.web'
import { StyleSheet, css } from 'aphrodite'
import TopBar from './TopBar'

function getRepo (state) {
  const { params = {
    owner: 'mathieudutour',
    repo: 'test'
  } } = state
  return params.owner + '/' + params.repo
}

class AppFrame extends React.Component {
  props: NavigationNavigatorProps
  componentWillReceiveProps (props: NavigationNavigatorProps) {
    if (this.props.navigation.state !== props.navigation.state) {
      window.scrollTo(0, 0)
    }
  }
  render () {
    const {navigation, router} = this.props
    const route = navigation.state.routes[navigation.state.index]
    const childNavigation = addNavigationHelpers({
      ...navigation,
      state: route
    })
    const repoName = getRepo(route)
    const ScreenView = router.getComponentForRouteName(route.routeName)
    return (
      <div className={css(styles.container)}>
        <TopBar repoName={repoName} />
        <ScreenView navigation={childNavigation} repoName={repoName} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f6f6f6',
    minWidth: '100vw',
    minHeight: '100vh',
    padding: '0 0 50px',
    boxSizing: 'border-box'
  }
})

export default AppFrame
