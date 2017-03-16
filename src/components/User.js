/* @flow */
import React from 'react';
import theme from '../theme';
import { connect } from 'react-redux';
import { StyleSheet } from 'aphrodite';
import Button from './Button';
import Avatar from './Avatar';

import { type UserType, type StateType } from '../../flow/types';

type Connect = {
  ready: boolean,
  user: UserType
};

type Props = Connect;

class User extends React.Component {
  props: Props;

  render() {
    if (!this.props.ready) {
      return null;
    }
    if (!this.props.user) {
      return (
        <div>
          <Button
            styles={styles.login}
            onClick={() => {
              window.location = 'https://github.com/login/oauth/authorize?client_id=bb0bd794e1974d1b64ab&scope=public_repo';
            }}
          >
            Login
          </Button>
        </div>
      );
    }
    return <Avatar user={this.props.user} />;
  }
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: theme.darker
  }
});

export default connect((state: StateType): Connect => {
  return {
    ready: state.user.status === 'ready',
    user: state.user.user
  };
})(User);
