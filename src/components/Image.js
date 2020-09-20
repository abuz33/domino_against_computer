import React from 'react'

import './image.css'

export default function Image(props) {
  return (
    <img
      key={props.tileName}
      src={require(`../assets/dominoes_tiles/${props.tileName}.jpg`)}
      className="Image"
      alt={props.tileName}
    />
  )
}
