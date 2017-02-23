import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'
import Card from './Card'
import { hideLoginOverlay } from '../reducers/ui'

const LoginOverlay = ({show, dispatch}) => (
  <div>
    <div className={css(styles.overlay, show && styles.overlayVisible)} onClick={() => dispatch(hideLoginOverlay())} />
    <Card styles={[styles.card, show && styles.cardVisible]}>
      <p>You need to login to do that</p>
      <Button styles={styles.login}
        onClick={() => { window.location = 'https://github.com/login/oauth/authorize?client_id=bb0bd794e1974d1b64ab&scope=public_repo' }}>
        Login
      </Button>
    </Card>
  </div>
)

const styles = StyleSheet.create({
  overlay: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    opacity: 1,
    top: 0,
    left: 0,
    zIndex: 1,
    transition: 'all 0.2s ease-in-out',
    pointerEvents: 'none',
    transitionDelay: '0.1s'
  },

  overlayVisible: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    pointerEvents: 'all',
    transitionDelay: 0
  },

  card: {
    position: 'fixed',
    width: '90vw',
    maxWidth: '280px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '50vh',
    zIndex: 2,
    textAlign: 'center',
    padding: '20px',
    transition: 'all 0.2s ease-in-out',
    opacity: 0,
    transitionDelay: 0
  },

  cardVisible: {
    opacity: 1,
    transitionDelay: '0.1s'
  }
})

export default connect((state) => {
  return {
    show: state.ui.showLoginOverlay
  }
})(LoginOverlay)
