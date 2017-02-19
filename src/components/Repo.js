/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Container from './Container'
import SearchIcon from './icons/Search'
import Card from './Card'
import Issue from './Issue'
import WaitingIssue from './WaitingIssue'
import IssueEmptyState from './emptyStates/issues'
import RepoCard from './RepoCard'
import { fetchIssues, selectors } from '../reducers/issues'
import { fetchRepo } from '../reducers/repo'

class Repo extends React.Component {
  componentDidMount () {
    if (this.props.userReady) {
      this.props.dispatch(fetchIssues(this.props.repoName, 'all'))
      this.props.dispatch(fetchRepo(this.props.repoName))
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.userReady && !this.props.userReady) {
      nextProps.dispatch(fetchIssues(nextProps.repoName, 'all'))
      nextProps.dispatch(fetchRepo(nextProps.repoName))
    }
  }
  render () {
    return (
      <Container styles={styles.container}>
        <RepoCard ready={this.props.repoReady} repo={this.props.repo} repoName={this.props.repoName} />
        <Card styles={styles.issuesList}>
          <div className={css(styles.header)}>
            <div className={css(styles.menu)}>Showing Top posts</div>
            <div className={css(styles.rightContainer)}><SearchIcon /></div>
          </div>
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
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #efefef'
  },

  menu: {
    padding: '15px 25px'
  },

  rightContainer: {
    color: '#bbb',
    fontSize: '15px',
    padding: '20px 30px',
    cursor: 'pointer'
  },

  sidebar: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    padding: '15px',
    margin: '0 15px 0 0',

    '@media (max-width: 780px)': {
      alignSelf: 'stretch',
      flex: 1,
      margin: '0 0 15px',
      width: 'auto'
    }
  },

  faces: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0 15px'
  },

  face: {
    width: '36px',
    height: '36px',
    margin: '0 4px 4px',
    background: '#ddd',
    borderRadius: '50%',
    overflow: 'hidden'
  },

  repoName: {
    color: '#bbb',
    fontSize: '20px',
    textAlign: 'center'
  },

  repoDescription: {
    textAlign: 'center'
  }
})

export default connect((state) => {
  return {
    userReady: state.user.status === 'ready',
    repoReady: state.repo.status === 'ready',
    repo: state.repo.repo,
    issueReady: state.issues.status === 'ready',
    issues: selectors.top(state.issues)
  }
})(Repo)
