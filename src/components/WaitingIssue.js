import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Upvote from './Upvote'
import CommentIcon from './icons/Comment'

const widths = [
  '150px',
  '204px',
  '356px',
  '194px',
  '421px'
]

const WaitingIssue = ({styles, index}) => (
  <div className={css(_styles.issue, styles)}>
    <div className={css(_styles.votes)}>
      <Upvote />
      <span className={css(_styles.shimmer, _styles.upvotesNumber)} />
    </div>
    <div className={css(_styles.body)}>
      <div className={css(_styles.shimmer, _styles.body)}
        style={{maxWidth: widths[index % 5]}} />
    </div>
    <CommentIcon />
    <div className={css(_styles.shimmer, _styles.comments)} />
  </div>
)

const placeHolderShimmer = {
  '0%': {
    backgroundPosition: '-460px 0'
  },
  '100%': {
    backgroundPosition: '460px 0'
  }
}

const _styles = StyleSheet.create({
  issue: {
    display: 'flex',
    padding: '15px 30px 15px 10px',
    alignItems: 'center',
    height: '76px',
    boxSizing: 'border-box',
    position: 'relative'
  },

  shimmer: {
    animationDuration: '1.5s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: [placeHolderShimmer],
    background: 'linear-gradient(to right, #eeeeee 73px, #dddddd 165px, #eeeeee 300px)',
    backgroundSize: '920px 76px',
    animationTimingFunction: 'linear'
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
    width: '18px'
  },

  body: {
    position: 'relative',
    top: '-2px',
    flex: 1,
    height: '17px',
    paddingRight: '30px'
  },

  comments: {
    height: '15px',
    width: '20px'
  }
})

export default WaitingIssue
