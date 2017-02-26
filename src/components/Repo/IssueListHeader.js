import React from 'react'
import theme from '../../theme'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import SearchIcon from '../icons/Search'
import CloseIcon from '../icons/Close'
import { searchIssues, changeFilter } from '../../reducers/issues'

class IssueListHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searching: false,
      filter: 'top'
    }
    this.searchIssues = debounce((e) => props.dispatch(searchIssues(props.repoName, e.target.value)), 100)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.repoName !== this.props.repoName) {
      this.searchIssues = debounce((e) => nextProps.dispatch(searchIssues(nextProps.repoName, e.target.value)), 100)
    }
  }

  render () {
    if (this.state.searching) {
      return (
        <div className={css(_styles.header, this.props.styles)}>
          <SearchIcon styles={_styles.menu} />
          <input
            className={css(_styles.input)}
            placeholder='Search...'
            autoFocus
            onChange={(e) => {
              e.persist()
              this.searchIssues(e)
            }} />
          <div className={css(_styles.rightContainer)}
            onClick={() => {
              this.setState({searching: false})
              this.props.dispatch(changeFilter(this.state.filter))
            }}>
            <CloseIcon />
          </div>
        </div>
      )
    }
    return (
      <div className={css(_styles.header, this.props.styles)}>
        <div className={css(_styles.menu)}>Showing Top posts</div>
        <div className={css(_styles.rightContainer)}
          onClick={() => {
            this.setState({searching: true})
            this.props.dispatch(changeFilter('search'))
          }}>
          <SearchIcon />
        </div>
      </div>
    )
  }
}

const _styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid ' + theme.light
  },

  menu: {
    padding: '15px 25px'
  },

  rightContainer: {
    padding: '20px 30px',
    cursor: 'pointer'
  },

  input: {
    flex: 1,
    height: '100%',
    border: 0,
    outline: 'none',
    fontSize: '17px',
    padding: '15px 0'
  }
})

export default connect()(IssueListHeader)
