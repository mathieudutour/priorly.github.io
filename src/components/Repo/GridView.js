/* @flow */

import React from 'react';
import { StyleSheet } from 'aphrodite';
import Container from '../Container';
import Card from '../Card';
import IssueBlock from '../IssueBlock';
import IssueEmptyState from '../emptyStates/issues';
import RepoCard from './RepoCard';
import IssueListHeader from './IssueListHeader';
import { type IssueType, type RepoType } from '../../../flow/types';

type Props = {
  repoName: string,
  repoReady: boolean,
  issueReady: boolean,
  issues: Array<IssueType>,
  repo: RepoType
};

const GridView = (props: Props) => (
  <Container styles={styles.container}>
    <RepoCard
      ready={props.repoReady}
      repo={props.repo}
      repoName={props.repoName}
    />
    <Card styles={styles.issuesList}>
      <IssueListHeader repoName={props.repoName} />
      {props.issues.length > 0 && !props.issueReady && 'Loading...'}
      {props.issues.length === 0 &&
        !props.issueReady &&
        Array.from(Array(5)).map((_, i) => (
          <IssueBlock key={i} waiting index={i} />
        ))}
      {props.issues.length === 0 && props.issueReady && <IssueEmptyState />}
      {props.issues.map(i => (
        <IssueBlock
          key={i.id}
          issue={i}
          repoName={props.repoName}
          showComment
        />
      ))}
    </Card>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    '@media (max-width: 780px)': {
      alignItems: 'stretch',
      flexDirection: 'column'
    }
  },

  issuesList: {
    width: '100%',
    alignSelf: 'flex-start'
  }
});

export default GridView;
