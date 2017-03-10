/* @flow */

import React from 'react';
import theme from '../../theme';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { StyleSheet, css } from 'aphrodite';
import Button from '../Button';
import { postComment } from '../../reducers/comments';
import { type AphroStyle, type Dispatch } from '../../../flow/types';

type Props = {
  styles?: AphroStyle,
  dispatch: Dispatch,
  repoName: string,
  number: string
};

const CreateIssue = (
  {
    styles,
    dispatch,
    repoName,
    number
  }: Props
) => (
  <form
    className={css(_styles.form, styles)}
    onSubmit={e => dispatch(postComment(repoName, number, e))}
  >
    <label className={css(_styles.label)} htmlFor="description">Comment</label>
    <Textarea
      id="description"
      className={css(_styles.input)}
      placeholder="Be nice :)"
    />
    <Button styles={_styles.submit} type="submit">Post comment</Button>
  </form>
);

const _styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 30px 10px 61px'
  },

  label: {
    position: 'relative',
    textTransform: 'uppercase',
    display: 'block',
    color: theme.darker,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '.05em',
    lineHeight: '15px',
    top: '24px',
    left: '12px'
  },

  input: {
    display: 'block',
    borderRadius: '3px',
    border: '1px solid ' + theme.light,
    background: theme.white,
    padding: '24px 12px 8px',
    outline: 'none',
    color: '#333',
    fontSize: '15px',
    lineHeight: '22px',
    minHeight: '22px',

    ':focus': {
      border: '1px solid ' + theme.dark
    }
  },

  submit: {
    background: theme.primary,
    alignSelf: 'flex-end',
    marginTop: '15px'
  }
});

export default connect()(CreateIssue);
