/* @flow */
export const HIDE_LOGIN_OVERLAY = 'ui/HIDE_LOGIN_OVERLAY'
export const SHOW_LOGIN_OVERLAY = 'ui/SHOW_LOGIN_OVERLAY'
export const MARKDOWN_LOADED = 'ui/MARKDOWN_LOADED'

export function hideLoginOverlay () {
  return {
    type: HIDE_LOGIN_OVERLAY
  }
}

let markdownCache
let loadingMarkdown = false

function addStyleTag (css) {
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')

  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
}

export function loadMarkdown () {
  if (loadingMarkdown) { return {type: 'ignore'} }
  loadingMarkdown = true
  return (dispatch) => Promise.all([
    System.import('marky-markdown'),
    System.import('../markdown-css')
  ]).then(([md, css]) => {
    addStyleTag(css.default)
    markdownCache = md
    return dispatch({
      type: MARKDOWN_LOADED
    })
  })
}

export function getMarkdown () {
  return markdownCache
}

export default (state = {showLoginOverlay: false, markdownReady: false}, action) => {
  switch (action.type) {
    case HIDE_LOGIN_OVERLAY:
      return {
        ...state,
        showLoginOverlay: false
      }
    case SHOW_LOGIN_OVERLAY:
      return {
        ...state,
        showLoginOverlay: true
      }
    case MARKDOWN_LOADED:
      return {
        ...state,
        markdownReady: true
      }
    default:
      return state
  }
}
