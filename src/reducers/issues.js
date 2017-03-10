/* @flow */
import {
  type Dispatch,
  type Status,
  type Action,
  type IssueType
} from '../../flow/types';
import axios from 'axios';
import github from './_github';
import { SHOW_LOGIN_OVERLAY } from './ui';

export const FETCH_ISSUES_RESOLVED = 'issues/FETCH_ISSUES_RESOLVED';
export const UPVOTE_ISSUE = 'issues/UPVOTE_ISSUE';
export const ERROR_POSTING_ISSUE = 'issues/ERROR_POSTING_ISSUE';
export const POST_ISSUE_RESOLVED = 'issues/POST_ISSUE_RESOLVED';
export const SEARCH_ISSUES_RESOLVED = 'issues/SEARCH_ISSUES_RESOLVED';
export const CHANGE_FILTER = 'issues/CHANGE_FILTER';

export function postIssue(repo: string, event: SyntheticInputEvent) {
  event.preventDefault();
  // $FlowFixMe
  const [title, body] = event.currentTarget;
  if (!title.value) {
    return {
      type: ERROR_POSTING_ISSUE,
      error: 'Oops! You forgot to enter a post title.'
    };
  }
  if (!window.localStorage.token) {
    return {
      type: SHOW_LOGIN_OVERLAY
    };
  }
  return (dispatch: Dispatch) => {
    return axios(
      github(`/repos/${repo}/issues`, {
        token: window.localStorage.token,
        method: 'POST',
        data: {
          title: title.value,
          body: body.value
        }
      })
    ).then(issue => {
      issue.data.reactions = {
        '+1': 0,
        total_count: 0
      };
      return dispatch({
        type: POST_ISSUE_RESOLVED,
        repoName: repo,
        issue: issue.data
      });
    });
  };
}

export function fetchIssues(repo: string, state: string) {
  return (dispatch: Dispatch) => {
    return axios(
      github(`/repos/${repo}/issues`, {
        accept: 'application/vnd.github.squirrel-girl-preview',
        token: window.localStorage.token,
        data: {
          state
        }
      })
    ).then(issues => {
      return dispatch({
        type: FETCH_ISSUES_RESOLVED,
        repoName: repo,
        issues: issues.data.filter(i => !i.pull_request)
      });
    });
  };
}

export function searchIssues(repo: string, query: string) {
  return (dispatch: Dispatch) => {
    return axios(
      github(`/search/issues`, {
        accept: 'application/vnd.github.squirrel-girl-preview',
        token: window.localStorage.token,
        data: {
          q: 'type:issue repo:' + repo + ' ' + query
        }
      })
    ).then(issues => {
      return dispatch({
        type: SEARCH_ISSUES_RESOLVED,
        repoName: repo,
        issues: issues.data.items
      });
    });
  };
}

export function upvoteIssue(repo: string, issue: IssueType) {
  if (!window.localStorage.token) {
    return {
      type: SHOW_LOGIN_OVERLAY
    };
  }
  return (dispatch: Dispatch) => {
    return axios(
      github(`/repos/${repo}/issues/${issue.number}/reactions`, {
        accept: 'application/vnd.github.squirrel-girl-preview',
        token: window.localStorage.token,
        method: 'POST',
        data: {
          content: '+1'
        }
      })
    ).then(res => {
      return dispatch({
        type: UPVOTE_ISSUE,
        issue: issue.id,
        alreadyUpvoted: res.status !== 201
      });
    });
  };
}

export function changeFilter(filter: string) {
  return {
    type: CHANGE_FILTER,
    filter
  };
}

type State = {
  status: Status,
  issues: Object,
  filter: string
};

export default (
  state: State = { status: 'loading', issues: {}, filter: 'top' },
  action: Action
) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case FETCH_ISSUES_RESOLVED:
      return {
        ...state,
        status: 'ready',
        issues: {
          ...state.issues,
          ...action.issues.reduce(
            (prev, i) => {
              i.id = `${action.repoName}/${i.number}`;
              prev[i.id] = i;
              return prev;
            },
            {}
          )
        }
      };
    case SEARCH_ISSUES_RESOLVED:
      return {
        ...state,
        status: 'ready',
        issues: {
          ...Object.keys(state.issues).reduce(
            (prev, k) => {
              prev[k] = {
                ...state.issues[k],
                searched: false,
                relevant: undefined
              };
              return prev;
            },
            {}
          ),
          ...action.issues.reduce(
            (prev, issue, i) => {
              issue.id = `${action.repoName}/${issue.number}`;
              prev[issue.id] = issue;
              prev[issue.id].searched = true;
              prev[issue.id].relevant = i;
              return prev;
            },
            {}
          )
        }
      };
    case UPVOTE_ISSUE:
      return {
        ...state,
        issues: {
          ...state.issues,
          [action.issue]: {
            ...state.issues[action.issue],
            reactions: {
              ...state.issues[action.issue].reactions,
              upvoted: true,
              ...(!action.alreadyUpvoted && {
                '+1': state.issues[action.issue].reactions['+1'] + 1,
                total_count: state.issues[action.issue].reactions.total_count +
                  1
              })
            }
          }
        }
      };
    case POST_ISSUE_RESOLVED:
      action.issue.id = `${action.repoName}/${action.issue.number}`;
      return {
        ...state,
        status: 'ready',
        issues: {
          ...state.issues,
          [action.issue.id]: action.issue
        }
      };
    default:
      return state;
  }
};

function filterAndSort(issues: Object, repoName: string, filter, sort) {
  return Object.keys(issues)
    .reduce(
      (prev, k) => {
        const issue = issues[k];
        if (issue.id.indexOf(repoName) === 0 && filter(issue)) {
          prev.push(issue);
        }
        return prev;
      },
      []
    )
    .sort(sort);
}

export const selectors = {
  new(state: State, repoName: string) {
    return filterAndSort(
      state.issues,
      repoName,
      i => !i.closed_at,
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  },

  top(state: State, repoName: string) {
    return filterAndSort(
      state.issues,
      repoName,
      i => !i.closed_at,
      (a, b) => b.reactions['+1'] - a.reactions['+1']
    );
  },

  closed(state: State, repoName: string) {
    return filterAndSort(
      state.issues,
      repoName,
      i => i.closed_at,
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
  },

  search(state: State, repoName: string) {
    return filterAndSort(
      state.issues,
      repoName,
      i => i.searched,
      (a, b) => a.relevant - b.relevant
    );
  },

  issue(state: State, issueId: string) {
    return state.issues[issueId];
  }
};
