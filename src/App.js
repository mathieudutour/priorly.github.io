/* @flow */

import {
  TabRouter,
  createNavigator
} from 'react-navigation/lib/react-navigation.web'

import About from './components/About'
import Home from './components/Home'
import Topics from './components/Topics'
import NotFound from './components/NotFound'
import AppFrame from './components/AppFrame'

const App = createNavigator(TabRouter({
  Home: {
    screen: Home,
    path: '',
    navigationOptions: {
      title: 'Home'
    }
  },
  About: {
    screen: About,
    path: 'about',
    navigationOptions: {
      title: 'About'
    }
  },
  Topics: {
    screen: Topics,
    path: 'topics',
    navigationOptions: {
      title: 'Topics'
    }
  },
  NotFound: {
    screen: NotFound,
    navigationOptions: {
      title: 'Page Not Found'
    }
  }
}))(AppFrame)

export default App
