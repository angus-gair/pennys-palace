"use client"

import { useState, useEffect } from "react"
import GameBoard from "./game-board"
import ShipPlacement from "./ship-placement"
import GameStatus from "./game-status"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Ship, GamePhase, Player, Cell, Coordinates } from "@/lib/types"
import { createEmptyBoard, placeShipsRandomly, isValidPlacement } from "@/lib/game-utils"
import { Anchor, Waves, RotateCw, Gamepad2, Trophy } from "lucide-react"

export default function BattleshipGame() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("placement")
  const [playerBoard, setPlayerBoard] = useState<Cell[][]>(createEmptyBoard())
  const [computerBoard, setComputerBoard] = useState<Cell[][]>(createEmptyBoard())
  const [playerShips, setPlayerShips] = useState<Ship[]>([
    { id: 1, name: "Carrier", size: 5, placed: false, sunk: false, hits: 0 },
    { id: 2, name: "Battleship", size: 4, placed: false, sunk: false, hits: 0 },
    { id: 3, name: "Cruiser", size: 3, placed: false, sunk: false, hits: 0 },
    { id: 4, name: "Submarine", size: 3, placed: false, sunk: false, hits: 0 },
    { id: 5, name: "Destroyer", size: 2, placed: false, sunk: false, hits: 0 },
  ])
  const [computerShips, setComputerShips] = useState<Ship[]>([
    { id: 1, name: "Carrier", size: 5, placed: true, sunk: false, hits: 0 },
    { id: 2, name: "Battleship", size: 4, placed: true, sunk: false, hits: 0 },
    { id: 3, name: "Cruiser", size: 3, placed: true, sunk: false, hits: 0 },
    { id: 4, name: "Submarine", size: 3, placed: true, sunk: false, hits: 0 },
    { id: 5, name: "Destroyer", size: 2, placed: true, sunk: false, hits: 0 },
  ])
  const [currentShip, setCurrentShip] = useState<Ship | null>(null)
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")
  const [currentPlayer, setCurrentPlayer] = useState<Player>("player")
  const [gameResult, setGameResult] = useState<"" | "player" | "computer">("")
  const [message, setMessage] = useState<string>("Position your fleet on the grid")
  const [activeTab, setActiveTab] = useState<string>("your-board")

  // Initialize computer's board with random ship placements
  useEffect(() => {
    const { board } = placeShipsRandomly(computerShips)
    setComputerBoard(board)
  }, [])

  // Check if all ships are placed to start the game
  useEffect(() => {
    if (gamePhase === "placement" && playerShips.every((ship) => ship.placed)) {
      setMessage("Fleet deployed! Ready to engage the enemy.")
    }
  }, [playerShips, gamePhase])

  // Check for win conditions
  useEffect(() => {
    if (gamePhase === "playing") {
      if (playerShips.every((ship) => ship.sunk)) {
        setGameResult("computer")
        setGamePhase("gameover")
        setMessage("Mission failed! The enemy has sunk all your ships.")
      } else if (computerShips.every((ship) => ship.sunk)) {
        setGameResult("player")
        setGamePhase("gameover")
        setMessage("Victory! You've destroyed the enemy fleet!")
      }
    }
  }, [playerShips, computerShips, gamePhase])

  // Computer's turn
  useEffect(() => {
    if (gamePhase === "playing" && currentPlayer === "computer") {
      const timer = setTimeout(() => {
        makeComputerMove()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentPlayer, gamePhase])

  // Switch to enemy board tab when game starts
  useEffect(() => {
    if (gamePhase === "playing") {
      setActiveTab("enemy-board")
    }
  }, [gamePhase])

  const selectShip = (ship: Ship) => {
    if (gamePhase !== "placement" || ship.placed) return
    setCurrentShip(ship)
    setMessage(`Position your ${ship.name} (${ship.size} cells)`)
  }

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === "horizontal" ? "vertical" : "horizontal"))
  }

  const placeShip = (row: number, col: number) => {
    if (!currentShip || gamePhase !== "placement") return

    const newBoard = [...playerBoard.map((row) => [...row])]
    const shipCoordinates: Coordinates[] = []

    // Calculate ship coordinates based on orientation
    for (let i = 0; i < currentShip.size; i++) {
      if (orientation === "horizontal") {
        shipCoordinates.push({ row, col: col + i })
      } else {
        shipCoordinates.push({ row: row + i, col })
      }
    }

    // Check if placement is valid
    if (!isValidPlacement(newBoard, shipCoordinates)) {
      setMessage("Invalid position. Ships cannot overlap or be adjacent to each other.")
      return
    }

    // Place the ship on the board
    shipCoordinates.forEach((coord) => {
      newBoard[coord.row][coord.col] = {
        ...newBoard[coord.row][coord.col],
        hasShip: true,
        shipId: currentShip.id,
      }
    })

    setPlayerBoard(newBoard)

    // Update ship status
    setPlayerShips((prevShips) =>
      prevShips.map((ship) => (ship.id === currentShip.id ? { ...ship, placed: true } : ship)),
    )

    setCurrentShip(null)
    setMessage("Ship deployed! Select another vessel to position.")
  }

  const startGame = () => {
    if (playerShips.every((ship) => ship.placed)) {
      setGamePhase("playing")
      setMessage("Battle commenced! Fire at the enemy grid.")
    } else {
      setMessage("You must position all ships before starting the battle.")
    }
  }

  const resetGame = () => {
    setGamePhase("placement")
    setPlayerBoard(createEmptyBoard())
    setComputerBoard(createEmptyBoard())
    setPlayerShips([
      { id: 1, name: "Carrier", size: 5, placed: false, sunk: false, hits: 0 },
      { id: 2, name: "Battleship", size: 4, placed: false, sunk: false, hits: 0 },
      { id: 3, name: "Cruiser", size: 3, placed: false, sunk: false, hits: 0 },
      { id: 4, name: "Submarine", size: 3, placed: false, sunk: false, hits: 0 },
      { id: 5, name: "Destroyer", size: 2, placed: false, sunk: false, hits: 0 },
    ])
    setComputerShips([
      { id: 1, name: "Carrier", size: 5, placed: true, sunk: false, hits: 0 },
      { id: 2, name: "Battleship", size: 4, placed: true, sunk: false, hits: 0 },
      { id: 3, name: "Cruiser", size: 3, placed: true, sunk: false, hits: 0 },
      { id: 4, name: "Submarine", size: 3, placed: true, sunk: false, hits: 0 },
      { id: 5, name: "Destroyer", size: 2, placed: true, sunk: false, hits: 0 },
    ])
    setCurrentShip(null)
    setOrientation("horizontal")
    setCurrentPlayer("player")
    setGameResult("")
    setMessage("Position your fleet on the grid")
    setActiveTab("your-board")

    // Initialize computer's board with random ship placements
    const { board } = placeShipsRandomly(computerShips)
    setComputerBoard(board)
  }

  const handlePlayerAttack = (row: number, col: number) => {
    if (gamePhase !== "playing" || currentPlayer !== "player") return
    if (computerBoard[row][col].isHit) {
      setMessage("You've already fired at this position. Choose another target.")
      return
    }

    const newBoard = [...computerBoard.map((r) => [...r])]
    newBoard[row][col] = { ...newBoard[row][col], isHit: true }

    let newMessage = "Miss! No enemy ships at those coordinates."

    // Check if hit a ship
    if (newBoard[row][col].hasShip) {
      newMessage = "Direct hit! Enemy vessel damaged."
      const shipId = newBoard[row][col].shipId!

      // Update ship hits
      const updatedShips = computerShips.map((ship) => {
        if (ship.id === shipId) {
          const newHits = ship.hits + 1
          const isSunk = newHits === ship.size
          if (isSunk) {
            newMessage = `Enemy ${ship.name} destroyed!`
          }
          return { ...ship, hits: newHits, sunk: isSunk }
        }
        return ship
      })

      setComputerShips(updatedShips)
    }

    setComputerBoard(newBoard)
    setMessage(newMessage)
    setCurrentPlayer("computer")
  }

  const makeComputerMove = () => {
    // Simple AI: randomly select a cell that hasn't been hit yet
    const availableMoves: Coordinates[] = []

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (!playerBoard[row][col].isHit) {
          availableMoves.push({ row, col })
        }
      }
    }

    if (availableMoves.length === 0) return

    // Select a random move
    const moveIndex = Math.floor(Math.random() * availableMoves.length)
    const { row, col } = availableMoves[moveIndex]

    const newBoard = [...playerBoard.map((r) => [...r])]
    newBoard[row][col] = { ...newBoard[row][col], isHit: true }

    let computerMessage = "Enemy missed!"

    // Check if hit a ship
    if (newBoard[row][col].hasShip) {
      computerMessage = "Enemy hit one of your ships!"
      const shipId = newBoard[row][col].shipId!

      // Update ship hits
      const updatedShips = playerShips.map((ship) => {
        if (ship.id === shipId) {
          const newHits = ship.hits + 1
          const isSunk = newHits === ship.size
          if (isSunk) {
            computerMessage = `Your ${ship.name} has been sunk!`
          }
          return { ...ship, hits: newHits, sunk: isSunk }
        }
        return ship
      })

      setPlayerShips(updatedShips)
    }

    setPlayerBoard(newBoard)
    setMessage(computerMessage)
    setCurrentPlayer("player")
  }

  const placeShipsRandomlyOnBoard = () => {
    if (gamePhase !== "placement") return

    const { board, ships } = placeShipsRandomly(playerShips)
    setPlayerBoard(board)
    setPlayerShips(ships)
    setMessage("Fleet auto-deployed! Ready to start the battle.")
  }

  return (
    <div className="flex flex-col items-center">
      <GameStatus message={message} currentPlayer={currentPlayer} gamePhase={gamePhase} />

      <div className="w-full max-w-5xl mx-auto">
        {gamePhase === "placement" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out]">
            <Card className="lg:col-span-1 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Anchor className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  Fleet Deployment
                </h2>
                <ShipPlacement
                  ships={playerShips}
                  selectShip={selectShip}
                  currentShip={currentShip}
                  orientation={orientation}
                  toggleOrientation={toggleOrientation}
                />
                <div className="flex flex-col gap-3 mt-6">
                  <Button
                    onClick={placeShipsRandomlyOnBoard}
                    variant="outline"
                    className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-[1.02]"
                  >
                    <RotateCw className="mr-2 h-4 w-4 animate-[rotate_2s_linear_infinite]" />
                    Auto-Deploy Fleet
                  </Button>
                  <Button
                    onClick={startGame}
                    disabled={!playerShips.every((ship) => ship.placed)}
                    className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-500 hover:from-cyan-700 hover:to-teal-700 dark:hover:from-cyan-600 dark:hover:to-teal-600 text-white transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Start Battle
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Waves className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  Your Waters
                </h2>
                <div className="flex justify-center">
                  <GameBoard
                    board={playerBoard}
                    onClick={gamePhase === "placement" ? placeShip : () => {}}
                    showShips={true}
                    currentShip={currentShip}
                    orientation={orientation}
                    gamePhase={gamePhase}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 animate-[fadeIn_0.5s_ease-out]">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-700">
                  <TabsTrigger
                    value="your-board"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 transition-all duration-300"
                  >
                    Your Waters
                  </TabsTrigger>
                  <TabsTrigger
                    value="enemy-board"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 transition-all duration-300"
                  >
                    Enemy Waters
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="your-board" className="mt-0 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex justify-center">
                    <GameBoard board={playerBoard} onClick={() => {}} showShips={true} gamePhase={gamePhase} />
                  </div>
                </TabsContent>
                <TabsContent value="enemy-board" className="mt-0 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex justify-center">
                    <GameBoard
                      board={computerBoard}
                      onClick={handlePlayerAttack}
                      showShips={gamePhase === "gameover"}
                      gamePhase={gamePhase}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      {gamePhase === "gameover" && (
        <Card className="mt-8 p-6 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 max-w-md mx-auto text-center animate-[fadeIn_0.8s_ease-out]">
          <div className="flex flex-col items-center gap-4">
            <Trophy
              className={`h-16 w-16 ${
                gameResult === "player"
                  ? "text-yellow-500 dark:text-yellow-400 animate-[bounce_2s_ease-in-out_infinite]"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            />
            <h2 className="text-2xl font-bold">{gameResult === "player" ? "Victory!" : "Defeat!"}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {gameResult === "player"
                ? "You've successfully destroyed the enemy fleet."
                : "Your fleet has been destroyed by the enemy."}
            </p>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-500 hover:from-cyan-700 hover:to-teal-700 dark:hover:from-cyan-600 dark:hover:to-teal-600 text-white transition-all duration-300 hover:scale-105"
            >
              Play Again
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
