/* @flow */
import { type Dispatch, type Status, type Action } from '../../flow/types';
import axios from 'axios';
import github from './_github';

export const FETCH_REPO_RESOLVED = 'repo/FETCH_REPO_RESOLVED';

export function fetchRepo(repo: string) {
  return (dispatch: Dispatch) => {
    return axios(
      github(`/repos/${repo}`, {
        token: window.localStorage.token
      })
    ).then(repo => {
      return dispatch({
        type: FETCH_REPO_RESOLVED,
        repo: repo.data
      });
    });
  };
}

type State = {
  status: Status,
  repo: ?Object
};

export default (
  state: State = { status: 'loading', repo: null },
  action: Action
) => {
  switch (action.type) {
    case FETCH_REPO_RESOLVED:
      return {
        ...state,
        status: 'ready',
        repo: action.repo
      };
    default:
      return state;
  }
};
