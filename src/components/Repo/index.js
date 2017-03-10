/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'aphrodite';
import TopBar from '../TopBar';
import Container from '../Container';
import Card from '../Card';
import IssueBlock from '../IssueBlock';
import IssueEmptyState from '../emptyStates/issues';
import RepoCard from './RepoCard';
import IssueListHeader from './IssueListHeader';
import { fetchIssues, selectors } from '../../reducers/issues';
import { fetchRepo } from '../../reducers/repo';
import {
  type IssueType,
  type RepoType,
  type Dispatch
} from '../../../flow/types';

function getRepoName(props) {
  return props.match.params.owner + '/' + props.match.params.repo;
}

type Props = {
  dispatch: Dispatch,
  repoName: string,
  userReady: boolean,
  repoReady: boolean,
  issueReady: boolean,
  issues: [IssueType],
  repo: RepoType
};

class Repo extends React.Component {
  props: Props;

  componentDidMount() {
    if (this.props.userReady) {
      this.props.dispatch(fetchIssues(this.props.repoName, 'all'));
      this.props.dispatch(fetchRepo(this.props.repoName));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.userReady && !this.props.userReady) ||
      (nextProps.userReady && this.props.repoName !== nextProps.repoName)
    ) {
      nextProps.dispatch(fetchIssues(nextProps.repoName, 'all'));
      nextProps.dispatch(fetchRepo(nextProps.repoName));
    }
  }
  render() {
    return (
      <div>
        <TopBar repoName={this.props.repoName} />
        <Container styles={styles.container}>
          <RepoCard
            ready={this.props.repoReady}
            repo={this.props.repo}
            repoName={this.props.repoName}
          />
          <Card styles={styles.issuesList}>
            <IssueListHeader repoName={this.props.repoName} />
            {this.props.issues.length > 0 &&
              !this.props.issueReady &&
              'Loading...'}
            {this.props.issues.length === 0 &&
              !this.props.issueReady &&
              Array.from(Array(5)).map((_, i) => (
                <IssueBlock key={i} waiting index={i} />
              ))}
            {this.props.issues.length === 0 &&
              this.props.issueReady &&
              <IssueEmptyState />}
            {this.props.issues.map(i => (
              <IssueBlock
                key={i.id}
                issue={i}
                repoName={this.props.repoName}
                showComment
              />
            ))}
          </Card>
        </Container>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    '@media (max-width: 780px)': {
      alignItems: 'stretch',
      flexDirection: 'column'
    }
  },

  issuesList: {
    width: '100%',
    alignSelf: 'flex-start'
  }
});

export default connect((state, ownProps) => {
  const repoName = getRepoName(ownProps);
  return {
    repoName,
    userReady: state.user.status === 'ready',
    repoReady: state.repo.status === 'ready',
    repo: state.repo.repo,
    issueReady: state.issues.status === 'ready',
    issues: selectors[state.issues.filter](state.issues, repoName)
  };
})(Repo);
