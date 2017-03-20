/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import theme from '../../theme';
import Upvote from './Upvote';
import WaitingIssue from './WaitingIssue';
import CommentIcon from '../icons/Comment';
import { upvoteIssue } from '../../reducers/issues';
import {
  type AphroStyle,
  type IssueType,
  type Dispatch
} from '../../../flow/types';
import { findLabel, getLabelName } from '../../kanban-helpers';

type VoteProps = {
  reactions: Object,
  onVote: (e: SyntheticMouseEvent) => void,
  smallView?: boolean
};

const Votes = (
  {
    reactions,
    onVote,
    smallView
  }: VoteProps
) => (
  <div
    className={css(_styles.votes, smallView && smallViewStyles.votes)}
    onClick={onVote}
  >
    <Upvote upvoted={(reactions || {}).upvoted} smallView={smallView} />
    <span className={css(_styles.upvotesNumber)}>
      {(reactions || {})['+1']}
    </span>
  </div>
);

type Props = {
  issue: IssueType,
  styles?: AphroStyle,
  dispatch: Dispatch,
  repoName: string,
  showComment: boolean,
  waiting: boolean,
  index: number,
  smallView: boolean
};

const Issue = (
  {
    issue,
    styles,
    dispatch,
    repoName,
    showComment,
    waiting,
    index,
    smallView
  }: Props
) => {
  if (waiting) {
    return <WaitingIssue index={index} />;
  }
  const label = findLabel(issue);
  return (
    <div
      className={css(_styles.issue, smallView && smallViewStyles.issue, styles)}
    >
      <Votes
        smallView={smallView}
        reactions={issue.reactions}
        onVote={() => dispatch(upvoteIssue(repoName, issue))}
      />
      <Link
        className={css(_styles.body, smallView && smallViewStyles.title)}
        to={`/${repoName}/${issue.number}`}
      >
        <div>{issue.title}</div>
        {!smallView &&
          issue.closed_at &&
          <div className={css(_styles.label)} style={{ color: '#3ac600' }}>
            Fixed
          </div>}
        {!smallView &&
          !issue.closed_at &&
          label &&
          <div
            className={css(_styles.label)}
            style={{ color: '#' + label.color }}
          >
            {getLabelName(label)}
          </div>}
      </Link>
      {showComment &&
        <CommentIcon styles={smallView && smallViewStyles.comment} />}
      {showComment &&
        <div className={css(smallView && smallViewStyles.commentNumber)}>
          {issue.comments}
        </div>}
    </div>
  );
};

const _styles = StyleSheet.create({
  issue: {
    display: 'flex',
    padding: '15px 20px 15px 0',
    margin: '0 10px',
    alignItems: 'center',
    flexFlow: 'row wrap',
    ':hover': {
      color: '#000'
    }
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
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'inherit'
  },

  label: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    margin: '4px 0 0'
  }
});

const smallViewStyles = StyleSheet.create({
  issue: {
    padding: '15px 0',
    margin: '0 15px',
    borderBottom: '1px solid ' + theme.background
  },

  title: {
    flex: 'auto',
    order: -1,
    width: '100%',
    paddingRight: '0'
  },

  votes: {
    order: 0,
    padding: '0 10px 0 0',
    minWidth: '0',
    flexDirection: 'row',
    transform: 'scale(0.7)'
  },

  comment: {
    transform: 'scale(0.7)'
  },

  commentNumber: {
    transform: 'scale(0.7)',
    marginLeft: '-4px',
    marginTop: '-2px'
  }
});

export default connect()(Issue);
