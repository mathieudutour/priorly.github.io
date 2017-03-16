/* @flow */
import { type Dispatch, type RepoState, type Action } from '../../flow/types';
import axios from 'axios';
import github from './_github';

export const FETCH_REPO_RESOLVED = 'repo/FETCH_REPO_RESOLVED';

export function fetchRepo(repo: string) {
  return (dispatch: Dispatch) => {
    return Promise.all([
      axios(
        github(`/repos/${repo}`, {
          token: window.localStorage.token
        })
      ),
      axios(
        github(`/repos/${repo}/labels`, {
          token: window.localStorage.token
        })
      ),
      axios(
        `https://raw.githubusercontent.com/${repo}/master/.priorlyrc`
      ).catch(() => ({ data: null }))
    ]).then(([repo, labels, config]) => {
      return dispatch({
        type: FETCH_REPO_RESOLVED,
        repo: repo.data,
        config: config.data,
        labels: labels.data
      });
    });
  };
}

export default (
  state: RepoState = { status: 'loading', repo: null, labels: [] },
  action: Action
) => {
  switch (action.type) {
    case FETCH_REPO_RESOLVED:
      return {
        ...state,
        status: 'ready',
        repo: action.repo,
        labels: action.labels || [],
        config: action.config || {}
      };
    default:
      return state;
  }
};
