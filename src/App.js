import React, { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'

const createDeck = (deck) => {
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      deck.push([i, j])
    }
  }

  return deck
}

const randomSelector = (deck, array, numElem) => {
  for (let i = 0; i < numElem; i++) {
    let index = Math.floor(Math.random() * deck.length)
    array.unshift(deck[index])
    deck.splice(index, 1)
  }
  return array
}
function App() {
  const [playerOne, setPlayerOne] = useState('')
  const [playerTwo, setPlayerTwo] = useState('')

  const [deck, setSetDeck] = useState(() => createDeck([]))
  const [playerOneTiles, setPlayerOneTiles] = useState(() =>
    randomSelector(deck, [], 7)
  )
  const [playerTwoTiles, setPlayerTwoTiles] = useState(() =>
    randomSelector(deck, [], 7)
  )

  const [board, setBoard] = useState(() => randomSelector(deck, [], 1))

  const addTilesToBoard = (tile) => {
    console.log('App.js', tile)
    setBoard((oldArray) => [...oldArray, tile])
  }

  return (
    <div className="App">
      <h1>Basic Domino Game</h1>
      <GameBoard
        tiles1={playerOneTiles}
        tiles2={playerTwoTiles}
        board={board}
        addTilesToBoard={addTilesToBoard}
        deck={deck}
      />
    </div>
  )
}

export default App
