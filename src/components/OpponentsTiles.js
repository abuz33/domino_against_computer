import React from 'react'
import { Button } from '@material-ui/core'

import './opponentTiles.css'
import Image from './Image'

const PlayersTiles = (props) => {
  const fixTileName = (arr) => {
    return arr.join('-')
  }

  return (
    <div className="tilesOpponent">
      {props.tiles.map((tile) => (
        <Button variant="contained" color="primary" disabled>
          <Image tileName={fixTileName(tile)} />
        </Button>
      ))}
    </div>
  )
}

export default PlayersTiles
