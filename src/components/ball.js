import React from 'react'

const Ball = ({ cx, cy, r, color}) =>
  <circle cx={cx.toFixed(2)} cy={cy.toFixed(2)} r={r} stroke='#000000' fill={ color } />

export default Ball