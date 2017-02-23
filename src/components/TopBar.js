import React from 'react'
import theme from './theme'
import { StyleSheet, css } from 'aphrodite'
import Link from './Link'
import Container from './Container'
import User from './User'

const TopBar = ({repoName}) => (
  <nav className={css(styles.topBar)}>
    <Container styles={styles.container}>
      <div>
        <Link to='About' className={css(styles.link, styles.logo)}>
          Prior.ly
        </Link>
        <Link to='Repo' className={css(styles.link, styles.repo)}>
          {repoName}
        </Link>
      </div>
      <User />
    </Container>
  </nav>
)

const styles = StyleSheet.create({
  topBar: {
    height: '60px',
    width: '100%',
    backgroundColor: theme.white,
    boxShadow: theme.shadow,
    margin: '0 0 30px',

    '@media (max-width: 780px)': {
      margin: '0 0 15px'
    }
  },

  container: {
    height: '100%',
    letterSpacing: '.01em',
    wordSpacing: '.02em',
    display: 'flex',
    justifyContent: 'space-between'
  },

  link: {
    fontSize: '17px',
    lineHeight: '24px',
    textDecoration: 'none'
  },

  logo: {
    fontWeight: 700,
    margin: '0 10px 0 0',
    color: theme.primary
  },

  repo: {
    color: theme.darkest
  }
})

export default TopBar
