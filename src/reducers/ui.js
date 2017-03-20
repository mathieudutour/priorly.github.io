/* @flow */
import { type Dispatch, type Action, type UIState } from '../../flow/types';

export const HIDE_LOGIN_OVERLAY = 'ui/HIDE_LOGIN_OVERLAY';
export const SHOW_LOGIN_OVERLAY = 'ui/SHOW_LOGIN_OVERLAY';
export const MARKDOWN_LOADED = 'ui/MARKDOWN_LOADED';
export const TOGGLE_VIEW = 'ui/TOGGLE_VIEW';

export function hideLoginOverlay() {
  return {
    type: HIDE_LOGIN_OVERLAY
  };
}

export function toggleView() {
  return {
    type: TOGGLE_VIEW
  };
}

let markdownCache;
let loadingMarkdown = false;

function addStyleTag(css) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  head.appendChild(style);
}

export function loadMarkdown() {
  if (loadingMarkdown) {
    return { type: 'ignore' };
  }
  loadingMarkdown = true;
  return (dispatch: Dispatch) =>
    Promise.all([
      // $FlowFixMe
      System.import('marky-markdown'),
      System.import('../markdown-css')
    ]).then(([md, css]) => {
      addStyleTag(css.default);
      markdownCache = md;
      return dispatch({
        type: MARKDOWN_LOADED
      });
    });
}

export function getMarkdown() {
  return markdownCache;
}

export default (
  state: UIState = {
    showLoginOverlay: false,
    markdownReady: false,
    view: 'list'
  },
  action: Action
) => {
  switch (action.type) {
    case HIDE_LOGIN_OVERLAY:
      return {
        ...state,
        showLoginOverlay: false
      };
    case SHOW_LOGIN_OVERLAY:
      return {
        ...state,
        showLoginOverlay: true
      };
    case MARKDOWN_LOADED:
      return {
        ...state,
        markdownReady: true
      };
    case TOGGLE_VIEW:
      return {
        ...state,
        view: state.view === 'grid' ? 'list' : 'grid'
      };
    default:
      return state;
  }
};
