import { type LabelType, type IssueType } from '../flow/types';

const KANBAN_LABEL = /^\d+ - /;

export const DONE_LABEL: LabelType = {
  id: 'done',
  name: '999 - Fixed',
  color: '000'
};

export const BACKLOG_LABEL: LabelType = {
  id: 'backlog',
  name: '000 - Backlog',
  color: '000'
};

export function findLabel(issue: IssueType): LabelType | void {
  return (issue.labels || []).find(l => KANBAN_LABEL.test(l.name));
}

export function getLabelName(label: LabelType): string {
  return label.name.replace(KANBAN_LABEL, '');
}

export function getLabelsSet(labels: LabelType[]): LabelType[] {
  return labels.filter(l => KANBAN_LABEL.test(l.name));
}
