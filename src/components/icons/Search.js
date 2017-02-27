/* @flow */
import { type AphroStyle } from '../../../flow/types'
import React from 'react'
import theme from '../../theme'
import { StyleSheet, css } from 'aphrodite'

const SearchIcon = ({styles}: {styles?: AphroStyle}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' className={css(_styles.icon, styles)}>
    <path d='M69 64.3c10.7-13 10-32.6-2.2-44.8-13-13-34.3-13-47.3 0s-13 34.3 0 47.3c6.5 6.5 15 9.7 23.6 9.7 7.5 0 15-2.5 21.2-7.5l20.2 20.2c.7.7 1.5 1 2.3 1s1.7-.3 2.3-1c1.3-1.3 1.3-3.3 0-4.7l-20.1-20.2zm-44.8-2.3c-10.4-10.4-10.4-27.4 0-37.8 5.2-5.2 12-7.9 18.9-7.9s13.7 2.7 18.9 7.9c10.4 10.4 10.4 27.4 0 37.8-10.4 10.5-27.4 10.5-37.8 0z' />
  </svg>
)

const _styles = StyleSheet.create({
  icon: {
    width: '20px',
    height: '20px',
    fill: theme.grey
  }
})

export default SearchIcon
