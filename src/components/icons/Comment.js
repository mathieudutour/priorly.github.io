import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const CommentIcon = ({styles}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className={css(_styles.icon, styles)}>
    <path d='M369.52 472a43.39 43.39 0 0 1-15.65-3.09c-9.25-3.63-18.93-9.32-28.79-17-11.83-9.21-23.65-18.75-35.09-28s-23-18.6-34.68-27.66a17 17 0 0 0-9.33-3.17c-15.06-.38-30.44-.34-45.31-.3h-22.86c-43.75-.25-83.65-14.62-115.4-41.55s-52.41-63.88-59.85-106.99c-7.85-45.46 2.49-91.67 29.12-130.1s66.32-64.2 111.55-72.14c4.62-.85 16.2-1.54 25.12-2h.48c40.52.08 76.83.1 94.87.1 28.76 0 58.5 0 87.74-.1h.47c2.37.11 4.62.32 6.62.51 39.08 3.64 76.21 21.94 104.55 51.52 28.08 29.31 45.24 67.23 48.31 106.77 2.89 37.59-4.53 73.49-21.46 103.8s-43.67 55.49-77.21 72.58c-3.28 1.66-3.36 2-3.22 5.37.49 13.56.39 27.22-.29 40.63a88 88 0 0 1-4.43 23c-3.95 11.65-11 20.12-20.45 24.54a34.68 34.68 0 0 1-14.81 3.28zm-154.52-98.45c10.45 0 21 .06 31.53.33h.11a36.16 36.16 0 0 1 20.16 7l.2.12c11.81 9.19 23.63 18.74 35.07 28s23.13 18.67 34.8 27.76c8.39 6.49 16.46 11.28 24 14.22 4 1.54 9.92 2.87 15.32.34 4.57-2.14 8.15-6.72 10.36-13.24a68.58 68.58 0 0 0 3.45-17.87c.65-12.81.75-25.9.28-38.86-.45-11 3.79-18.22 13.73-23.27 61.35-31.27 93.51-88.77 88.21-157.75-5.71-73.49-63.95-133.95-135.46-140.61-1.79-.17-3.63-.35-5.46-.44-29.19.1-58.86.1-87.56.1-18 0-54.23 0-94.67-.1-13.37.65-20.37 1.3-22.32 1.66h-.11c-82.19 14.41-139.47 96.85-125.11 180.06 13.58 78.84 76.47 132.13 156.38 132.59h22.71z' />
  </svg>
)

const _styles = StyleSheet.create({
  icon: {
    width: '20px',
    height: '20px',
    position: 'relative',
    top: '-1px',
    marginRight: '5px',
    fill: 'rgba(35, 35, 35, .4)'
  }
})

export default CommentIcon
