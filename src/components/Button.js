import React from 'react'
import theme from '../theme'
import { StyleSheet, css } from 'aphrodite'

const Button = ({children, styles, ...rest}) => (
  <button className={css(_styles.button, styles)} {...rest}>
    {children}
  </button>
)

const _styles = StyleSheet.create({
  button: {
    backgroundColor: theme.primary,
    alignSelf: 'flex-end',
    padding: '14px 16px',
    border: 'none',
    textTransform: 'uppercase',
    fontWeight: 700,
    color: '#FFF',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'all .1s ease-in-out',
    outline: 'none',

    ':hover': {
      opacity: '.8'
    }
  }
})

export default Button
