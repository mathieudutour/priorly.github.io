import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'aphrodite'
import Button from './Button'
import Avatar from './Avatar'

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
    return <Avatar user={this.props.user} />
  }
}

const styles = StyleSheet.create({
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
