export type AphroStyle = Object | false | void | Array<Object>;

export type Status = 'loading' | 'ready';

export type Action = {
  type: string
};

export type UserType = {
  avatar_url: String,
  login: String
};

export type IssueType = {
  id: string,
  body: string,
  user: UserType,
  created_at: Date
};

export type CommentType = {
  id: string,
  body: string,
  user: UserType,
  created_at: Date
};

export type RepoType = {
  description: string,
  full_name: string,
  collaborators: ?Array<UserType>,
  owner: UserType
};

export type LabelType = {
  id: string,
  url: string,
  name: string,
  color: string,
  default: boolean
};

export type Dispatch = (action: Action | Promise<Action>) => Promise;

export type IssuesState = {
  status: Status,
  issues: { [id: string]: IssueType },
  filter: string
};

export type RepoState = {
  status: Status,
  repo: ?RepoType,
  labels: Array<LabelType>
};

export type UserState = {
  status: Status,
  user: UserType
};

export type UIState = {
  showLoginOverlay: boolean,
  markdownReady: boolean
};

export type CommentsState = {
  status: Status,
  comments: { [id: string]: CommentType }
};

export type StateType = {
  issues: IssuesState,
  repo: RepoState,
  user: UserState,
  ui: UIState,
  comments: CommentsState
};
