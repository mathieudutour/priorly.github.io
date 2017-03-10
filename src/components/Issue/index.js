/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import theme from '../../theme';
import { StyleSheet, css } from 'aphrodite';
import TopBar from '../TopBar';
import Container from '../Container';
import Card from '../Card';
import Comment from './Comment';
import CommentForm from './CommentForm';
import IssueBlock from '../IssueBlock';
import {
  fetchIssues,
  selectors as issueSelectors
} from '../../reducers/issues';
import {
  fetchComments,
  selectors as commentsSelectors
} from '../../reducers/comments';
import {
  type AphroStyle,
  type IssueType,
  type CommentType,
  type Dispatch
} from '../../../flow/types';

function getRepoName(props) {
  return props.match.params.owner + '/' + props.match.params.repo;
}

function fetchInfo(props) {
  props.dispatch(fetchComments(props.repoName, props.match.params.number));
  if (!props.issue) {
    props.dispatch(fetchIssues(props.repoName, 'all'));
  }
}

type Props = {
  userReady: boolean,
  dispatch: Dispatch,
  styles?: AphroStyle,
  issueId: string,
  repoName: string,
  issue: IssueType,
  match: {
    params: {
      number: string
    }
  },
  comments: [CommentType]
};

class Issue extends React.Component {
  props: Props;

  componentDidMount() {
    if (this.props.userReady) {
      fetchInfo(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.userReady && !this.props.userReady) ||
      (nextProps.userReady && this.props.issueId !== nextProps.issueId)
    ) {
      fetchInfo(nextProps);
    }
  }
  render() {
    return (
      <div>
        <TopBar repoName={this.props.repoName} />
        <Container styles={styles.container}>
          <Card styles={styles.commentsList}>
            {this.props.issue &&
              <IssueBlock
                issue={this.props.issue}
                repoName={this.props.repoName}
              />}
            {this.props.issue &&
              <Comment
                comment={this.props.issue}
                styles={styles.description}
              />}
            {this.props.issue &&
              <CommentForm
                repoName={this.props.repoName}
                number={this.props.match.params.number}
              />}
            {this.props.issue &&
              this.props.comments &&
              <div className={css(styles.separator)} />}
            {this.props.issue &&
              this.props.comments &&
              this.props.comments.map(c => <Comment comment={c} key={c.id} />)}
          </Card>
        </Container>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  commentsList: {
    width: '100%',
    alignSelf: 'flex-start'
  },

  description: {
    paddingTop: 0
  },

  separator: {
    height: '1px',
    background: theme.light
  }
});

export default connect((state, ownProps) => {
  const repoName = getRepoName(ownProps);
  const issueId = `${repoName}/${ownProps.match.params.number}`;
  return {
    repoName,
    userReady: state.user.status === 'ready',
    issueReady: state.issues.status === 'ready',
    issueId,
    issue: issueSelectors.issue(state.issues, issueId),
    commentsReady: state.comments.status === 'ready',
    comments: commentsSelectors(state.comments, issueId)
  };
})(Issue);
