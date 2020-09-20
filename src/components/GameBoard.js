import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import PlayersTiles from './PlayersTiles'
import OpponentTiles from './OpponentsTiles'
import Board from './Board'

const GameBoard = (props) => {
  const [tiles, setTiles] = useState(props.tiles)
  const [board, setBoard] = useState(props.board || null)
  const [container, setContainer] = useState(props.container || null)
  const [connectedTiles, setConnectedTiles] = useState([])
  const [finishControl, setFinishControl] = useState([])
  const [playerName, setPlayerName] = useState(props.name)

  const findValidTile = (deck, boardTiles, playerTiles) => {
    let isFinish = false
    let validTile = []
    while (!isFinish) {
      validTile = playerTiles.find((tile) => {
        return tile.includes(
          boardTiles[0][0] || boardTiles[boardTiles.length - 1][1]
        )
      })
      validTile === undefined
        ? deck.length > 0
          ? randomSelector(deck, playerTiles, 1)
          : (isFinish = true)
        : (isFinish = true)
    }

    return validTile
  }

  const boardHandler = (
    validTile,
    playerTiles,
    boardTiles,
    connectedTiles,
    finishControl
  ) => {
    if (validTile !== undefined) {
      let indexOfTile = playerTiles.indexOf(validTile)
      connectedTiles.splice(0, 1, validTile)
      if (boardTiles[0][0] === validTile[0]) {
        connectedTiles.splice(1, 2, boardTiles[0])
        boardTiles.unshift(validTile.reverse())
      } else if (boardTiles[0][0] === validTile[1]) {
        connectedTiles.splice(1, 2, boardTiles[0])
        boardTiles.unshift(validTile)
      } else if (boardTiles[boardTiles.length - 1][1] === validTile[0]) {
        connectedTiles.splice(1, 2, boardTiles[boardTiles.length - 1])
        boardTiles.push(validTile)
      } else if (boardTiles[boardTiles.length - 1][1] === validTile[1]) {
        connectedTiles.splice(1, 2, boardTiles[boardTiles.length - 1])
        boardTiles.push(validTile.reverse())
      }
      playerTiles.splice(indexOfTile, 1)
    } else finishControl.push(1)
  }

  const playHandler = async () => {
    let containerArr = [...container]
    let validTile = await findValidTile(containerArr, board, tiles)
    setContainer(() => containerArr)
    let arr = [...tiles]
    await boardHandler(validTile, arr, board, connectedTiles, finishControl)

    setTiles(() => arr)
    await props.changeBoard(board)
    await props.clickHandler()
  }

  const randomSelector = (deck, array, numElem) => {
    for (let i = 0; i < numElem; i++) {
      let index = Math.floor(Math.random() * deck.length)
      array.unshift(deck[index])
      deck.splice(index, 1)
    }
    return array
  }

  const handleClick = (key) => {
    console.log(key)
    props.addTilesToBoard(key)
  }

  return (
    <div className="gameBoard">
      <div>
        <PlayersTiles
          tiles={props.tiles1}
          onClick={handleClick}
          board={props.board}
        />
      </div>
      <div className="board">
        <Board tiles={props.board} />
      </div>

      <div className="playerTiles">
        <div className="draw">
          <Button color="secondary"> Draw A Tile</Button>
        </div>
        <OpponentTiles tiles={props.tiles2} onClick={handleClick} />
      </div>
    </div>
  )
}

export default GameBoard
