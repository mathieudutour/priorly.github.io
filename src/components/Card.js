import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Card = ({children, styles}) => (
  <div className={css(_styles.card, styles)}>
    {children}
  </div>
)

const _styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e9e9e9',
    borderRadius: '3px',
    boxShadow: '0 1px 1px rgba(0, 0, 0, .1)'
  }
})

export default Card
