import React, { useState } from 'react'

import './Store.css'
import Image from './Image'

const Board = (props) => {
  const joinArray = (arr) => {
    return arr.join('-')
  }
  return (
    <div>
      <ul className="Store">
        {props.tiles.map((tile) => (
          <Image key={joinArray(tile)} tileName={joinArray(tile)} />
        ))}
      </ul>
    </div>
  )
}

export default Board
