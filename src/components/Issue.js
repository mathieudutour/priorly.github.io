import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Upvote from './Upvote'
import CommentIcon from './icons/Comment'
import { upvoteIssue } from '../reducers/issues'

const Votes = ({reactions, onVote}) => (
  <div className={css(_styles.votes)} onClick={onVote}>
    <Upvote />
    <span className={css(_styles.upvotesNumber)}>{reactions['+1']}</span>
  </div>
)

const KANBAN_LABEL = /^\d+ - /

function findLabel (issue) {
  return (issue.labels || []).find(l => KANBAN_LABEL.test(l.name))
}

function getLabel (issue) {
  return findLabel(issue).name.replace(/^\d+ - /, '')
}

const Issue = ({issue, styles, dispatch, repoName}) => (
  <div className={css(_styles.issue, styles)}>
    <Votes
      reactions={issue.reactions}
      onVote={() => dispatch(upvoteIssue(repoName, issue))} />
    <div className={css(_styles.body)}>
      <div>{issue.title}</div>
      {issue.closed_at &&
        <div className={css(_styles.label)} style={{color: '#3ac600'}}>
          Fixed
        </div>}
      {!issue.closed_at && findLabel(issue) &&
        <div className={css(_styles.label)} style={{color: '#' + findLabel(issue).color}}>
          {getLabel(issue)}
        </div>}
    </div>
    <CommentIcon />
    <div>
      {issue.comments}
    </div>
  </div>
)

const _styles = StyleSheet.create({
  issue: {
    display: 'flex',
    padding: '15px 30px 15px 10px',
    alignItems: 'center'
  },

  votes: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minWidth: '50px',
    padding: '4px 0',
    cursor: 'pointer'
  },

  upvotesNumber: {
    minHeight: '13px',
    textAlign: 'center',
    fontSize: '15px',
    lineHeight: '22px',
    touchCallout: 'none',
    userSelect: 'none'
  },

  body: {
    position: 'relative',
    top: '-2px',
    flex: 1,
    paddingRight: '30px',
    letterSpacing: '.01em',
    wordSpacing: '.02em',
    fontSize: '17px',
    lineHeight: '22px',
    display: 'flex',
    flexDirection: 'column'
  },

  label: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    margin: '4px 0 0'
  }
})

export default connect()(Issue)
