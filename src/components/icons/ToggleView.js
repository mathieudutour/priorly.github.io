/* @flow */
import { type AphroStyle } from '../../../flow/types';
import React from 'react';
import theme from '../../theme';
import { css, StyleSheet } from 'aphrodite';

const ToggleView = (
  { styles, grid }: { styles?: AphroStyle, grid?: boolean }
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={css(_styles.icon, !grid && _styles.rotated, styles)}
  >
    <path
      d="M34 16.5h14.5v67h-14.5zM51.501 16.5h14.5v67h-14.5zM69.001 16.5h14.499v67h-14.499zM16.5 16.5h14.5v67h-14.5z"
    />
  </svg>
);

const _styles = StyleSheet.create({
  icon: {
    width: '30px',
    height: '30px',
    fill: theme.grey,
    transition: 'transform 0.2s ease-in-out',
    transform: 'rotateZ(0)'
  },

  rotated: {
    transform: 'rotateZ(90deg)'
  }
});

export default ToggleView;
