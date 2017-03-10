/* @flow */
import { type AphroStyle } from '../../../flow/types';
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Upvote from './Upvote';
import CommentIcon from '../icons/Comment';
import Shimmer from '../Shimmer';

const widths = ['150px', '204px', '250px', '194px', '275px'];

const WaitingIssue = (
  { styles, index }: { styles?: AphroStyle, index: number }
) => (
  <div className={css(_styles.issue, styles)}>
    <div className={css(_styles.votes)}>
      <Upvote />
      <span className={css(_styles.upvotesNumber)}><Shimmer /></span>
    </div>
    <div className={css(_styles.body)}>
      <div
        className={css(_styles.body)}
        style={{ maxWidth: widths[index % 5] }}
      >
        <Shimmer />
      </div>
    </div>
    <CommentIcon />
    <div className={css(_styles.comments)}><Shimmer /></div>
  </div>
);

const _styles = StyleSheet.create({
  issue: {
    display: 'flex',
    padding: '15px 30px 15px 10px',
    alignItems: 'center',
    height: '76px',
    boxSizing: 'border-box',
    position: 'relative'
  },

  votes: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minWidth: '50px',
    padding: '4px 0',
    cursor: 'wait'
  },

  upvotesNumber: {
    height: '15px',
    width: '18px',
    overflow: 'hidden'
  },

  body: {
    position: 'relative',
    top: '-2px',
    flex: 1,
    height: '17px',
    paddingRight: '30px',
    overflow: 'hidden'
  },

  comments: {
    height: '15px',
    width: '20px',
    overflow: 'hidden'
  }
});

export default WaitingIssue;
