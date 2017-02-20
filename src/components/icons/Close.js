import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const CloseIcon = ({styles}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={css(_styles.icon, styles)}>
    <path d='M20.827 4.357l-.707-.707-8.131 8.132-8.132-8.132-.707.707 8.132 8.132-8.132 8.132.707.707 8.132-8.132 8.131 8.132.707-.707-8.131-8.132z' />
  </svg>
)

const _styles = StyleSheet.create({
  icon: {
    width: '20px',
    height: '20px',
    fill: 'rgba(35, 35, 35, .4)'
  }
})

export default CloseIcon
