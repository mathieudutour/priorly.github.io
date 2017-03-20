/* @flow */

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import theme from '../../theme';
import IssueBlock from '../IssueBlock';
import {
  getLabelsSet,
  getLabelName,
  findLabel,
  DONE_LABEL,
  BACKLOG_LABEL
} from '../../kanban-helpers';
import {
  type IssueType,
  type RepoType,
  type LabelType
} from '../../../flow/types';

type Props = {
  repoName: string,
  repoReady: boolean,
  issueReady: boolean,
  issues: IssueType[],
  repo: RepoType,
  labels: LabelType[]
};

function getAndSortLabels(labels: LabelType[]): LabelType[] {
  return [BACKLOG_LABEL, DONE_LABEL]
    .concat(getLabelsSet(labels))
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
}

function filterIssuesForLabel(label: LabelType) {
  return function(issue: IssueType): boolean {
    if (label.id === DONE_LABEL.id) {
      return issue.closed_at;
    }
    if (issue.closed_at) {
      return false;
    }
    if (label.id === BACKLOG_LABEL.id) {
      return !findLabel(issue);
    }
    return (issue.labels || []).find(l => l.name === label.name);
  };
}

const GridView = (props: Props) => {
  const labels = getAndSortLabels(props.labels);
  return (
    <div className={css(styles.container)}>
      <div
        className={css(styles.containerWrapper)}
        style={{ minWidth: labels.length * 272 + 'px' }}
      >
        {labels.map(label => {
          const issues = props.issues.filter(filterIssuesForLabel(label));
          if (issues.length === 0 && props.issueReady) {
            return;
          }
          return (
            <div key={label.id} className={css(styles.column)}>
              <div className={css(styles.wrapper)}>
                <div
                  className={css(styles.label)}
                  style={{ color: '#' + label.color }}
                >
                  {getLabelName(label)}
                </div>
                <div>
                  {issues.length > 0 && !props.issueReady && 'Loading...'}
                  {issues.length === 0 &&
                    !props.issueReady &&
                    Array.from(Array(5)).map((_, i) => (
                      <IssueBlock key={i} waiting index={i} />
                    ))}
                  {issues.map(i => (
                    <IssueBlock
                      smallView
                      key={i.id}
                      issue={i}
                      repoName={props.repoName}
                      showComment
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'calc(100vh - 90px)',
    width: '100%',
    overflowX: 'scroll'
  },

  containerWrapper: {
    display: 'flex'
  },

  wrapper: {
    backgroundColor: theme.white,
    border: '1px solid ' + theme.background,
    borderRadius: '3px',
    boxShadow: theme.shadow
  },

  column: {
    flex: '1',
    minWidth: '250px',
    height: 'calc(100vh - 115px)',
    overflowY: 'auto',
    margin: '0 10px 10px'
  },

  label: {
    textTransform: 'uppercase',
    padding: '10px 0px',
    margin: '0 15px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    borderBottom: '1px solid ' + theme.background
  }
});

export default GridView;
