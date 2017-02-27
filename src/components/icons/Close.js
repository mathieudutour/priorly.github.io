/* @flow */
import { type AphroStyle } from '../../../flow/types'
import React from 'react'
import theme from '../../theme'
import { StyleSheet, css } from 'aphrodite'

const CloseIcon = ({styles}: {styles?: AphroStyle}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={css(_styles.icon, styles)}>
    <path d='M20.827 4.357l-.707-.707-8.131 8.132-8.132-8.132-.707.707 8.132 8.132-8.132 8.132.707.707 8.132-8.132 8.131 8.132.707-.707-8.131-8.132z' />
  </svg>
)

const _styles = StyleSheet.create({
  icon: {
    width: '20px',
    height: '20px',
    fill: theme.grey
  }
})

export default CloseIcon
