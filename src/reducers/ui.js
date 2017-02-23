/* @flow */
export const HIDE_LOGIN_OVERLAY = 'ui/HIDE_LOGIN_OVERLAY'
export const SHOW_LOGIN_OVERLAY = 'ui/SHOW_LOGIN_OVERLAY'

export function hideLoginOverlay () {
  return {
    type: HIDE_LOGIN_OVERLAY
  }
}

export default (state = {showLoginOverlay: false}, action) => {
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
    default:
      return state
  }
}
