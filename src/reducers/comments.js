/* @flow */
import { type Dispatch, type Status, type Action } from '../../flow/types'
import axios from 'axios'
import github from './_github'
import { SHOW_LOGIN_OVERLAY } from './ui'

export const FETCH_COMMENTS_RESOLVED = 'comments/FETCH_COMMENTS_RESOLVED'
export const ERROR_POSTING_COMMENT = 'issues/ERROR_POSTING_COMMENT'
export const POST_COMMENT_RESOLVED = 'issues/POST_COMMENT_RESOLVED'

export function postComment (repo: string, number: string, event: SyntheticInputEvent) {
  event.preventDefault()
  // $FlowFixMe
  const [comment] = event.currentTarget
  if (!comment.value) {
    return {
      type: ERROR_POSTING_COMMENT,
      error: 'Oops! You forgot to enter a post title.'
    }
  }
  if (!window.localStorage.token) {
    return {
      type: SHOW_LOGIN_OVERLAY
    }
  }
  return (dispatch: Dispatch) => {
    return axios(github(`/repos/${repo}/issues/${number}/comments`, {
      token: window.localStorage.token,
      method: 'POST',
      data: {
        body: comment.value
      }
    })).then((createdComment) => {
      return dispatch({
        type: POST_COMMENT_RESOLVED,
        id: `${repo}/${number}`,
        comment: createdComment.data
      })
    })
  }
}

export function fetchComments (repo: string, number: string) {
  return (dispatch: Dispatch) => {
    return axios(github(`/repos/${repo}/issues/${number}/comments`, {
      accept: 'application/vnd.github.squirrel-girl-preview',
      token: window.localStorage.token
    })).then((comments) => {
      return dispatch({
        type: FETCH_COMMENTS_RESOLVED,
        id: `${repo}/${number}`,
        comments: comments.data
      })
    })
  }
}

type State = {
  status: Status,
  comments: Object
}

export default (state: State = {status: 'loading', comments: {}}, action: Action) => {
  switch (action.type) {
    case FETCH_COMMENTS_RESOLVED:
      return {
        ...state,
        status: 'ready',
        comments: {
          ...state.comments,
          [action.id]: action.comments
        }
      }
    case POST_COMMENT_RESOLVED:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.id]: [
            ...state.comments[action.id],
            action.comment
          ]
        }
      }
    default:
      return state
  }
}

export function selectors (state: State, issueId: string) {
  return state.comments[issueId]
}
