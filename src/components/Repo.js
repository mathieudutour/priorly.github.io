/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'aphrodite'
import TopBar from './TopBar'
import Container from './Container'
import Card from './Card'
import Issue from './Issue'
import WaitingIssue from './WaitingIssue'
import IssueEmptyState from './emptyStates/issues'
import RepoCard from './RepoCard'
import IssueListHeader from './IssueListHeader'
import { fetchIssues, selectors } from '../reducers/issues'
import { fetchRepo } from '../reducers/repo'

function repoName (props) {
  return props.match.params.owner + '/' + props.match.params.repo
}

class Repo extends React.Component {
  componentDidMount () {
    if (this.props.userReady) {
      this.props.dispatch(fetchIssues(this.props.repoName, 'all'))
      this.props.dispatch(fetchRepo(this.props.repoName))
    }
  }
  componentWillReceiveProps (nextProps) {
    if (
      (nextProps.userReady && !this.props.userReady) ||
      (nextProps.userReady && this.props.repoName !== nextProps.repoName)
    ) {
      nextProps.dispatch(fetchIssues(nextProps.repoName, 'all'))
      nextProps.dispatch(fetchRepo(nextProps.repoName))
    }
  }
  render () {
    return (
      <div>
        <TopBar repoName={this.props.repoName} />
        <Container styles={styles.container}>
          <RepoCard ready={this.props.repoReady} repo={this.props.repo} repoName={this.props.repoName} />
          <Card styles={styles.issuesList}>
            <IssueListHeader repoName={this.props.repoName} />
            {this.props.issues.length > 0 && !this.props.issueReady && 'Loading...'}
            {this.props.issues.length === 0 && !this.props.issueReady && (
              Array.from(Array(5)).map((_, i) => <WaitingIssue key={i} index={i} />)
            )}
            {this.props.issues.length === 0 && this.props.issueReady && (
              <IssueEmptyState />
            )}
            {this.props.issues.map(i => <Issue key={i.id} issue={i} repoName={this.props.repoName} />)}
          </Card>
        </Container>
      </div>
    )
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
})

export default connect((state, ownProps) => {
  return {
    repoName: repoName(ownProps),
    userReady: state.user.status === 'ready',
    repoReady: state.repo.status === 'ready',
    repo: state.repo.repo,
    issueReady: state.issues.status === 'ready',
    issues: selectors[state.issues.filter](state.issues)
  }
})(Repo)
