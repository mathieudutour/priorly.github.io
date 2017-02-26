import React from 'react'
import theme from '../theme'
import { StyleSheet, css } from 'aphrodite'

const Card = ({children, styles}) => (
  <div className={css(_styles.card, styles)}>
    {children}
  </div>
)

const _styles = StyleSheet.create({
  card: {
    backgroundColor: theme.white,
    border: '1px solid ' + theme.background,
    borderRadius: '3px',
    boxShadow: theme.shadow
  }
})

export default Card
