import React, { Component, PropTypes } from 'react'


function Dir(props){
  const { angle, x, y } = props,
        transform = `rotate(${angle} ${x} ${y})`
  return (
    <path transform={ transform }
      d="M10,43 L10,15 L38,29 L10,43 Z" id="pos" fill="#F8E81C"></path>
  )
}

export default function Hero(props){
  const { heroState, position} = props
  let angle = 0
  switch(heroState){
    case 'ST_RIGHT':
      angle = 0
      break;
    case 'ST_LEFT':
      angle = 180
      break
    case 'J_RIGHT':
      angle = -45
      break
    case 'J_LEFT':
      angle = -135
      break
    case 'CLIMB':
      angle = -90
      break
    default:
      angle = 0
      break
  }
  const x = position.get('x'),
        y = position.get('y')
  let transform=`translate(${x} ${y})`
  return (
    <g id="heropos" transform={transform}>
        <rect id="hero" fill="#FF0000" x="0" y="0" width="48" height="56" rx="8"></rect>
        <Dir angle={ angle } x={24} y={30} />
    </g>
  )
}

Hero.propTypes = {
  heroState: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
}