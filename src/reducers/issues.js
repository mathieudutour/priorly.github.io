/* @flow */
import axios from 'axios'
import github from './_github'
import { SHOW_LOGIN_OVERLAY } from './ui'

export const FETCH_ISSUES_RESOLVED = 'issues/FETCH_ISSUES_RESOLVED'
export const UPVOTE_ISSUE = 'issues/UPVOTE_ISSUE'
export const ERROR_POSTING_ISSUE = 'issues/ERROR_POSTING_ISSUE'
export const POST_ISSUE_RESOLVED = 'issues/POST_ISSUE_RESOLVED'
export const SEARCH_ISSUES_RESOLVED = 'issues/SEARCH_ISSUES_RESOLVED'
export const CHANGE_FILTER = 'issues/CHANGE_FILTER'

export function postIssue (repo, event) {
  event.preventDefault()
  const [title, body] = event.currentTarget
  if (!title.value) {
    return {
      type: ERROR_POSTING_ISSUE,
      error: 'Oops! You forgot to enter a post title.'
    }
  }
  if (!window.localStorage.token) {
    return {
      type: SHOW_LOGIN_OVERLAY
    }
  }
  return (dispatch) => {
    return axios(github(`/repos/${repo}/issues`, {
      token: window.localStorage.token,
      method: 'POST',
      data: {
        title: title.value,
        body: body.value
      }
    })).then((issue) => {
      issue.data.reactions = {
        '+1': 0,
        total_count: 0
      }
      return dispatch({
        type: POST_ISSUE_RESOLVED,
        issue: issue.data
      })
    })
  }
}

export function fetchIssues (repo, state) {
  return (dispatch) => {
    return axios(github(`/repos/${repo}/issues`, {
      accept: 'application/vnd.github.squirrel-girl-preview',
      token: window.localStorage.token,
      data: {
        state
      }
    })).then((issues) => {
      return dispatch({
        type: FETCH_ISSUES_RESOLVED,
        issues: issues.data.filter(i => !i.pull_request)
      })
    })
  }
}

export function searchIssues (repo, query) {
  return (dispatch) => {
    return axios(github(`/search/issues`, {
      accept: 'application/vnd.github.squirrel-girl-preview',
      token: window.localStorage.token,
      data: {
        q: 'type:issue repo:' + repo + ' ' + query
      }
    })).then((issues) => {
      return dispatch({
        type: SEARCH_ISSUES_RESOLVED,
        issues: issues.data.items
      })
    })
  }
}

export function upvoteIssue (repo, issue) {
  if (!window.localStorage.token) {
    return {
      type: SHOW_LOGIN_OVERLAY
    }
  }
  return (dispatch) => {
    return axios(github(`/repos/${repo}/issues/${issue.number}/reactions`, {
      accept: 'application/vnd.github.squirrel-girl-preview',
      token: window.localStorage.token,
      method: 'POST',
      data: {
        content: '+1'
      }
    })).then((res) => {
      if (res.status === 201) {
        return dispatch({
          type: UPVOTE_ISSUE,
          issue: issue.id
        })
      }
    })
  }
}

export function changeFilter (filter) {
  return {
    type: CHANGE_FILTER,
    filter
  }
}

export default (state = {status: 'loading', issues: {}, filter: 'top'}, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.filter
      }
    case FETCH_ISSUES_RESOLVED:
      return {
        ...state,
        status: 'ready',
        issues: action.issues.reduce((prev, i) => {
          prev[i.id] = i
          return prev
        }, {})
      }
    case SEARCH_ISSUES_RESOLVED:
      return {
        ...state,
        status: 'ready',
        issues: {
          ...Object.keys(state.issues).reduce((prev, k) => {
            prev[k] = {
              ...state.issues[k],
              searched: false,
              relevant: undefined
            }
            return prev
          }, {}),
          ...action.issues.reduce((prev, issue, i) => {
            prev[issue.id] = issue
            prev[issue.id].searched = true
            prev[issue.id].relevant = i
            return prev
          }, {})
        }
      }
    case UPVOTE_ISSUE:
      return {
        ...state,
        issues: {
          ...state.issues,
          [action.issue]: {
            ...state.issues[action.issue],
            reactions: {
              ...state.issues[action.issue].reactions,
              '+1': state.issues[action.issue].reactions['+1'] + 1,
              total_count: state.issues[action.issue].reactions.total_count + 1
            }
          }
        }
      }
    case POST_ISSUE_RESOLVED:
      return {
        ...state,
        status: 'ready',
        issues: {
          ...state.issues,
          [action.issue.id]: action.issue
        }
      }
    default:
      return state
  }
}

export const selectors = {
  new (state) {
    return Object.keys(state.issues)
      .map(k => state.issues[k])
      .filter(i => !i.closed_at)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },

  top (state) {
    return Object.keys(state.issues)
      .map(k => state.issues[k])
      .filter(i => !i.closed_at)
      .sort((a, b) => b.reactions['+1'] - a.reactions['+1'])
  },

  closed (state) {
    return Object.keys(state.issues)
      .map(k => state.issues[k])
      .filter(i => i.closed_at)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  },

  search (state) {
    return Object.keys(state.issues)
      .map(k => state.issues[k])
      .filter(i => i.searched)
      .sort((a, b) => a.relevant - b.relevant)
  }
}
