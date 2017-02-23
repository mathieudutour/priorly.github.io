/* @flow */

import {
  TabRouter,
  createNavigator
} from 'react-navigation/lib/react-navigation.web'

import About from './components/About'
import Repo from './components/Repo'
import NotFound from './components/NotFound'
import AppFrame from './components/AppFrame'

const router = TabRouter({
  Home: {
    screen: Repo,
    path: '',
    navigationOptions: {
      title: 'Prior.ly'
    }
  },
  Repo: {
    screen: Repo,
    path: ':owner/:repo',
    navigationOptions: {
      title: 'Prior.ly'
    }
  },
  About: {
    screen: About,
    path: 'about',
    navigationOptions: {
      title: 'Prior.ly - About'
    }
  },
  NotFound: {
    screen: NotFound,
    navigationOptions: {
      title: 'Prior.ly - Page Not Found'
    }
  }
})

const App = createNavigator(router)(AppFrame)

export default App
