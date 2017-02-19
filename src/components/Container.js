import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Container = ({children, styles}) => (
  <div className={css(_styles.container, styles)}>
    {children}
  </div>
)

const _styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: '960px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0 auto',
    padding: '0 30px',
    boxSizing: 'border-box'
  }
})

export default Container
