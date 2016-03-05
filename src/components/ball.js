import React from 'react'

const Ball = ({ cx, cy, r, className}) =>
  <circle cx={cx} cy={cy} r={r} stroke='#000000' className={ className || ''} />

export default Ball