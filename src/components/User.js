import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Button from './Button'

class User extends React.Component {
  render () {
    if (!this.props.ready) {
      return false
    }
    if (!this.props.user) {
      return (
        <div>
          <Button styles={styles.login}
            onClick={() => { window.location = 'https://github.com/login/oauth/authorize?client_id=bb0bd794e1974d1b64ab' }}>
            Login
          </Button>
        </div>
      )
    }
    return (
      <div className={css(styles.face)}>
        <img src={this.props.user.avatar_url + '&s=36'} style={{width: '100%'}} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  face: {
    width: '36px',
    height: '36px',
    background: '#ddd',
    borderRadius: '50%',
    overflow: 'hidden'
  },

  login: {
    backgroundColor: '#bbb'
  }
})

export default connect(state => {
  return {
    ready: state.user.status === 'ready',
    user: state.user.user
  }
})(User)
