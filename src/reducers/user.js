/* @flow */
import axios from 'axios'
import qs from 'query-string'
import github from './_github'

export const NOT_FETCHING_USER = 'user/NOT_FETCHING_USER'
export const FETCH_USER_RESOLVED = 'user/FETCH_USER_RESOLVED'
export const LOGOUT = 'user/LOGOUT'

export function fetchToken () {
  if (window.localStorage.token) {
    return (d) => d(fetchUser())
  }
  const parsed = qs.parse(window.location.search)
  let code = (parsed || {}).code
  if (Array.isArray(code)) {
    code = code[code.length - 1]
  }
  if (code) {
    return (dispatch) => {
      return axios('https://trel3c8m81.execute-api.eu-west-1.amazonaws.com/dev/authenticate/' + code)
        .then(({data}) => {
          if (data.statusCode === 200) {
            const token = JSON.parse(data.body).token
            window.localStorage.token = token
            return dispatch(fetchUser())
          }
        })
    }
  }
  return {
    type: NOT_FETCHING_USER
  }
}

export function fetchUser () {
  return (dispatch) => {
    return axios(github(`/user`, { token: window.localStorage.token }))
      .then((user) => {
        return dispatch({
          type: FETCH_USER_RESOLVED,
          user: user.data
        })
      })
  }
}

export function logout () {
  delete window.localStorage.token
  return {
    type: LOGOUT
  }
}

export default (state = {status: 'loading', user: null}, action) => {
  switch (action.type) {
    case NOT_FETCHING_USER:
      return {
        ...state,
        status: 'ready'
      }
    case FETCH_USER_RESOLVED:
      return {
        ...state,
        status: 'ready',
        user: action.user
      }
    case LOGOUT:
      return {
        ...state,
        status: 'ready',
        user: null
      }
    default:
      return state
  }
}
