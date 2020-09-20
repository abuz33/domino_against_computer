import React from 'react'
import './Store.css'
import Image from './Image'

export default function Store(props) {
  console.log(props.tiles)
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
