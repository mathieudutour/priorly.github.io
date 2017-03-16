/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import TopBar from '../TopBar';
import ListView from './ListView';
import { fetchIssues, selectors } from '../../reducers/issues';
import { fetchRepo } from '../../reducers/repo';

import {
  type IssueType,
  type RepoType,
  type Dispatch,
  type StateType
} from '../../../flow/types';

type Connect = {
  repoName: string,
  userReady: boolean,
  repoReady: boolean,
  issueReady: boolean,
  issues: Array<IssueType>,
  repo: RepoType
};

type Props =
  & {
    dispatch: Dispatch
  }
  & Connect;

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
        <ListView
          repoName={this.props.repoName}
          repoReady={this.props.repoReady}
          issueReady={this.props.issueReady}
          issues={this.props.issues}
          repo={this.props.repo}
        />
      </div>
    );
  }
}

function getRepoName(props) {
  return props.match.params.owner + '/' + props.match.params.repo;
}

export default connect((state: StateType, ownProps): Connect => {
  const repoName = getRepoName(ownProps);
  return {
    repoName,
    userReady: state.user.status === 'ready',
    repoReady: state.repo.status === 'ready',
    repo: state.repo.repo,
    labels: state.repo.labels,
    issueReady: state.issues.status === 'ready',
    issues: selectors[state.issues.filter](state.issues, repoName)
  };
})(Repo);
