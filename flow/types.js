export type AphroStyle = Object | false | void | Object[];

export type Status = 'loading' | 'ready';

export type Action = {
  type: string
};

export type UserType = {
  avatar_url: String,
  login: String
};

export type LabelType = {
  id: string,
  url: string,
  name: string,
  color: string,
  default: boolean
};

export type IssueType = {
  id: string,
  body: string,
  user: UserType,
  created_at: Date,
  labels?: LabelType[]
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
  collaborators?: UserType[],
  owner: UserType
};

export type Dispatch = (action: Action | Promise<Action>) => Promise;

export type IssuesState = {
  status: Status,
  issues: { [id: string]: IssueType },
  filter: 'top' | 'new' | 'all' | 'search' | 'closed'
};

export type RepoState = {
  status: Status,
  repo: RepoType | null,
  labels: LabelType[]
};

export type UserState = {
  status: Status,
  user: UserType
};

export type UIState = {
  showLoginOverlay: boolean,
  markdownReady: boolean,
  view: 'grid' | 'list'
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
