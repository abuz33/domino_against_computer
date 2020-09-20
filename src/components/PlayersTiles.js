import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'

import './playerTiles.css'
import Image from './Image'

const PlayersTiles = (props) => {
  const { board, tiles, onClick } = props

  const fixTileName = (arr) => {
    return arr.join('-')
  }

  const findValidTile = (board, playerTiles) => {
    for (let i = 0; i < playerTiles.length; i++) {
      if (playerTiles[i].includes(board[0][0] || board[board.length - 1][0])) {
        playerTiles[i] = {
          tile: playerTiles[i],
          disabled: false,
        }
      } else {
        playerTiles[i] = {
          tile: playerTiles[i],
          disabled: true,
        }
      }
    }
  }

  useEffect(() => {
    findValidTile(board, tiles)
  }, [board, tiles])

  console.log(tiles)

  return (
    <div className="tiles">
      {tiles.map((tile) => (
        <Button
          key={fixTileName(tile.tile)}
          variant="contained"
          color="primary"
          onClick={() => onClick(tile)}
          disabled={tile.disabled}
        >
          <Image tileName={fixTileName(tile)} />
        </Button>
      ))}
    </div>
  )
}

export default PlayersTiles
