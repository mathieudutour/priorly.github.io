/* @flow */
import axios from 'axios'
import github from './_github'

export const FETCH_REPO_RESOLVED = 'repo/FETCH_REPO_RESOLVED'

export function fetchRepo (repo, state) {
  return (dispatch) => {
    return axios(github(`/repos/${repo}`, {
      token: window.localStorage.token
    }))
    .then((repo) => {
      return dispatch({
        type: FETCH_REPO_RESOLVED,
        repo: repo.data
      })
    })
  }
}

export default (state = {status: 'loading', repo: null}, action) => {
  switch (action.type) {
    case FETCH_REPO_RESOLVED:
      return {
        ...state,
        status: 'ready',
        repo: action.repo
      }
    default:
      return state
  }
}
