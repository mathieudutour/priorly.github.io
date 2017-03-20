/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import ToggleView from './icons/ToggleView';
import { toggleView } from '../reducers/ui';

import { type Dispatch, type StateType } from '../../flow/types';

type Connect = {
  grid: boolean
};

type Props =
  & {
    dispatch: Dispatch
  }
  & Connect;

const ToggleViewButton = ({ grid, dispatch }: Props) => (
  <button
    className={css(styles.button)}
    onClick={() => dispatch(toggleView())}
    title={grid ? 'List view' : 'Grid view'}
  >
    <ToggleView grid={grid} />
  </button>
);

const styles = StyleSheet.create({
  button: {
    height: '100%',
    background: 'transparent',
    border: '0',
    outline: 'none',
    cursor: 'pointer'
  }
});

export default connect((state: StateType): Connect => {
  return {
    grid: state.ui.view === 'grid'
  };
})(ToggleViewButton);
