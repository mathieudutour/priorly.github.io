import React from 'react'
import theme from './theme'
import { StyleSheet, css } from 'aphrodite'

const Upvote = ({upvoted}) => (
  <div className={css(_styles.upvote)} />
)

const _styles = StyleSheet.create({
  upvote: {
    width: 0,
    height: 0,
    borderLeft: '9px solid transparent',
    borderRight: '9px solid transparent',
    borderBottom: '9px solid ' + theme.grey,
    marginBottom: '7px',
    transition: 'all .1s ease-in-out'
  }
})

export default Upvote
