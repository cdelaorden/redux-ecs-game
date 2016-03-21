import React from 'react'

export default function Floor(props){
  const x = props.position.get('x'),
        y = props.position.get('y'),
        w = props.size.get('w'),
        h = props.size.get('h')

  return (
    <rect fill='#012' x={ x } y={ y } width={ w } height={ h } />
  )
}