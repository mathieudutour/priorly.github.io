/* @flow */
import { type UserType } from '../../../flow/types'
import React from 'react'
import theme from '../../theme'
import { StyleSheet, css } from 'aphrodite'
import Card from '../Card'
import CreateIssueForm from './CreateIssueForm'
import Avatar from '../Avatar'
import Shimmer from '../Shimmer'

type propTypes = {
  ready: boolean,
  repo: {
    description: string,
    full_name: string,
    collaborators: ?Array<UserType>,
    owner: UserType
  },
  repoName: string,
}

const RepoCard = ({ready, repo, repoName}: propTypes) => (
  <Card styles={styles.sidebar}>
    <div className={css(styles.faces)}>
      {ready && (repo.collaborators || [repo.owner]).map(c =>
        <Avatar user={c} key={c.id} />
      )}
      {!ready && <Avatar loading />}
    </div>
    <div>
      {ready && <h1 className={css(styles.repoName)}>{repo.full_name}</h1>}
      {ready && <p className={css(styles.repoDescription)}>{repo.description}</p>}
      {!ready && <div className={css(styles.nameWaiting)}><Shimmer /></div>}
      {!ready && <div className={css(styles.descriptionWaiting)}><Shimmer /></div>}
    </div>
    <CreateIssueForm repoName={repoName} />
  </Card>
)

const styles = StyleSheet.create({
  sidebar: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    padding: '15px',
    margin: '0 15px 0 0',

    '@media (max-width: 780px)': {
      alignSelf: 'stretch',
      flex: 1,
      margin: '0 0 15px',
      width: 'auto'
    }
  },

  faces: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0 15px'
  },

  repoName: {
    color: theme.darker,
    fontSize: '20px',
    textAlign: 'center'
  },

  repoDescription: {
    textAlign: 'center'
  },

  nameWaiting: {
    maxWidth: '140px',
    height: '25px',
    margin: '13.4px auto',
    overflow: 'hidden'
  },

  descriptionWaiting: {
    maxWidth: '200px',
    height: '18px',
    margin: '16px auto',
    overflow: 'hidden'
  }
})

export default RepoCard
