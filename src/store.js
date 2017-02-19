/* @flow */

import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import * as rootReducers from './reducers'

const defaultState = (typeof window !== 'undefined' && window.__INITIAL_STATE__)

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composeEnhancers(
  applyMiddleware(thunk),
)

const store = createStore(combineReducers(rootReducers), defaultState, enhancers)

export default store
