import React from 'react'
import { connect } from 'react-redux'
import theme from '../../theme'
import { StyleSheet, css } from 'aphrodite'
import Avatar from '../Avatar'
import { loadMarkdown, getMarkdown } from '../../reducers/ui'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function displayDate (date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

class Comment extends React.Component {
  componentDidMount () {
    if (!this.props.markdownReady) {
      this.props.dispatch(loadMarkdown())
    }
  }

  render () {
    const {styles, comment, markdownReady} = this.props
    return (
      <div className={css(_styles.comment, styles)}>
        <div className={css(_styles.user)}>
          <Avatar user={comment.user} styles={_styles.avatar} />
          <span className={css(_styles.username)}>{comment.user.login}</span>
        </div>
        {markdownReady && comment.body &&
          <div className={'markdown-body ' + css(_styles.body)} dangerouslySetInnerHTML={{
            __html: getMarkdown()(comment.body, {
              highlightSyntax: false,
              enableHeadingLinkIcons: false
            })
          }} />
        }
        <div className={css(_styles.date)}>{displayDate(new Date(comment.created_at))}</div>
      </div>
    )
  }
}

const _styles = StyleSheet.create({
  comment: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 30px 15px 20px'
  },

  user: {
    display: 'flex',
    flexDirection: 'row'
  },

  avatar: {
    width: '26px',
    height: '26px',
    marginLeft: '2px'
  },

  username: {
    fontSize: '15px',
    lineHeight: '26px',
    fontWeight: 600,
    paddingLeft: '10px'
  },

  body: {
    paddingLeft: '43px',
    paddingBottom: '8px'
  },

  date: {
    color: theme.dark,
    fontSize: '12px',
    lineHeight: '17px',
    fontWeight: 500,
    paddingLeft: '43px'
  }
})

export default connect(state => {
  return {
    markdownReady: state.ui.markdownReady
  }
})(Comment)
