const KANBAN_LABEL = /^\d+ - /;

export function findLabel(issue) {
  return (issue.labels || []).find(l => KANBAN_LABEL.test(l.name));
}

export function getLabel(issue) {
  return findLabel(issue).name.replace(/^\d+ - /, '');
}

export function getLabelsSet(issues) {}
