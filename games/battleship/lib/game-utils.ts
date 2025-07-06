import type { Cell, Ship, Coordinates } from "./types"

export function createEmptyBoard(): Cell[][] {
  return Array(10)
    .fill(null)
    .map(() =>
      Array(10)
        .fill(null)
        .map(() => ({ hasShip: false, isHit: false })),
    )
}

export function isValidPlacement(board: Cell[][], coordinates: Coordinates[]): boolean {
  const boardSize = board.length

  // Check if all coordinates are within the board
  for (const { row, col } of coordinates) {
    if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
      return false
    }

    // Check if the cell already has a ship
    if (board[row][col].hasShip) {
      return false
    }

    // Check adjacent cells (ships can't touch)
    for (let r = Math.max(0, row - 1); r <= Math.min(boardSize - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(boardSize - 1, col + 1); c++) {
        // Skip the cell itself
        if (r === row && c === col) continue

        // Check if there's a ship in an adjacent cell
        if (board[r][c].hasShip) {
          return false
        }
      }
    }
  }

  return true
}

export function placeShipsRandomly(ships: Ship[]): { board: Cell[][]; ships: Ship[] } {
  const board = createEmptyBoard()
  const updatedShips = [...ships]

  for (let i = 0; i < updatedShips.length; i++) {
    const ship = { ...updatedShips[i] }
    let placed = false
    let attempts = 0

    while (!placed && attempts < 100) {
      attempts++

      // Randomly choose orientation
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical"

      // Calculate max valid starting position based on orientation and ship size
      const maxRow = orientation === "vertical" ? 10 - ship.size : 9
      const maxCol = orientation === "horizontal" ? 10 - ship.size : 9

      // Generate random starting position
      const startRow = Math.floor(Math.random() * (maxRow + 1))
      const startCol = Math.floor(Math.random() * (maxCol + 1))

      // Generate coordinates for the ship
      const coordinates: Coordinates[] = []
      for (let j = 0; j < ship.size; j++) {
        if (orientation === "horizontal") {
          coordinates.push({ row: startRow, col: startCol + j })
        } else {
          coordinates.push({ row: startRow + j, col: startCol })
        }
      }

      // Check if placement is valid
      if (isValidPlacement(board, coordinates)) {
        // Place the ship on the board
        coordinates.forEach(({ row, col }) => {
          board[row][col] = {
            ...board[row][col],
            hasShip: true,
            shipId: ship.id,
          }
        })

        ship.placed = true
        updatedShips[i] = ship
        placed = true
      }
    }

    // If we couldn't place the ship after 100 attempts, just give up
    if (!placed) {
      console.error(`Could not place ship ${ship.name} after 100 attempts`)
    }
  }

  return { board, ships: updatedShips }
}
