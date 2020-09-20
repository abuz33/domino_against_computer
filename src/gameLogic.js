export function findValidTile(tileContainer, boardTiles, playerTiles) {
  let isFinish = false
  let validTile = []
  while (!isFinish) {
    validTile = playerTiles.find((tile) => {
      return tile.includes(
        boardTiles[0][0] || boardTiles[boardTiles.length - 1][1]
      )
    })
    validTile === undefined
      ? tileContainer.length > 0
        ? randomSelector(tileContainer, playerTiles, 1)
        : (isFinish = true)
      : (isFinish = true)
  }

  return validTile
}

export function boardHandler(
  validTile,
  playerTiles,
  boardTiles,
  connectedTiles,
  finishControl
) {
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

export async function playHandler() {
  let containerArr = [...container]
  let validTile = await findValidTile(containerArr, board, tiles)
  setContainer(() => containerArr)
  let arr = [...tiles]
  await boardHandler(validTile, arr, board, connectedTiles, finishControl)

  setTiles(() => arr)
  await props.changeBoard(board)
  await props.clickHandler()
}
