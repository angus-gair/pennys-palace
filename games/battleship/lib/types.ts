export type Cell = {
  hasShip: boolean
  isHit: boolean
  shipId?: number
}

export type Ship = {
  id: number
  name: string
  size: number
  placed: boolean
  sunk: boolean
  hits: number
}

export type GamePhase = "placement" | "playing" | "gameover"

export type Player = "player" | "computer"

export type Coordinates = {
  row: number
  col: number
}
