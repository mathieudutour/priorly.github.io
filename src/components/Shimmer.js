import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Shimmer = () => (
  <div className={css(styles.shimmer)} />
)

const placeHolderShimmer = {
  '0%': {
    backgroundPosition: '-460px 0'
  },
  '100%': {
    backgroundPosition: '460px 0'
  }
}

const styles = StyleSheet.create({
  shimmer: {
    animationDuration: '1.5s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: [placeHolderShimmer],
    background: 'linear-gradient(to right, #eeeeee 73px, #dddddd 165px, #eeeeee 300px)',
    backgroundSize: '920px 76px',
    animationTimingFunction: 'linear',
    width: '920px',
    height: '76px'
  }
})

export default Shimmer
