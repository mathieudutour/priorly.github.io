export type AphroStyle = Object | false | void | Array<Object>

export type Status =
  | 'loading'
  | 'ready'

export type Action = {
  type: string,
}

export type UserType = {
  avatar_url: String,
  login: String
}

export type IssueType = {
  id: string,
  body: string,
  user: UserType,
  created_at: Date
}

export type Dispatch = (action: Action | Promise<Action>) => Promise
