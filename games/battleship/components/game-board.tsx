"use client"

import React, { useState, useRef } from "react"
import type { Cell, Ship, GamePhase } from "@/lib/types"
import { isValidPlacement } from "@/lib/game-utils"
import { cn } from "@/lib/utils"
import { HitAnimation } from "./animations/hit-animation"
import { MissAnimation } from "./animations/miss-animation"
import { SinkAnimation } from "./animations/sink-animation"
import { PlaceShipAnimation } from "./animations/place-ship-animation"

interface GameBoardProps {
  board: Cell[][]
  onClick: (row: number, col: number) => void
  showShips: boolean
  currentShip?: Ship | null
  orientation?: "horizontal" | "vertical"
  gamePhase: GamePhase
}

export default function GameBoard({
  board,
  onClick,
  showShips,
  currentShip,
  orientation = "horizontal",
  gamePhase,
}: GameBoardProps) {
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null)
  const [lastHit, setLastHit] = useState<{ row: number; col: number; type: "hit" | "miss" | "sink" | "place" } | null>(
    null,
  )
  const boardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (row: number, col: number) => {
    if (gamePhase === "placement" && currentShip) {
      setHoverCell({ row, col })
    }
  }

  const handleMouseLeave = () => {
    setHoverCell(null)
  }

  const getPreviewCells = () => {
    if (!hoverCell || !currentShip) return []

    const { row, col } = hoverCell
    const previewCells = []

    for (let i = 0; i < currentShip.size; i++) {
      if (orientation === "horizontal") {
        previewCells.push({ row, col: col + i })
      } else {
        previewCells.push({ row: row + i, col })
      }
    }

    return previewCells
  }

  const isValidPreview = () => {
    if (!currentShip || !hoverCell) return true
    const previewCells = getPreviewCells()
    return isValidPlacement(board, previewCells)
  }

  const handleClick = (row: number, col: number) => {
    // Don't trigger animations for already hit cells
    if (gamePhase === "playing" && !board[row][col].isHit) {
      // Determine animation type based on what's in the cell
      if (board[row][col].hasShip) {
        // Check if this would sink the ship
        const shipId = board[row][col].shipId!
        let shipCells = 0
        let shipHits = 0

        // Count total cells and hits for this ship
        for (let r = 0; r < board.length; r++) {
          for (let c = 0; c < board[r].length; c++) {
            if (board[r][c].shipId === shipId) {
              shipCells++
              if (board[r][c].isHit) {
                shipHits++
              }
            }
          }
        }

        // If this hit would sink the ship (all cells hit)
        if (shipHits + 1 === shipCells) {
          setLastHit({ row, col, type: "sink" })
        } else {
          setLastHit({ row, col, type: "hit" })
        }
      } else {
        setLastHit({ row, col, type: "miss" })
      }
    } else if (gamePhase === "placement" && currentShip) {
      // For ship placement
      const previewCells = getPreviewCells()
      if (isValidPlacement(board, previewCells)) {
        setLastHit({ row, col, type: "place" })
      }
    }

    // Call the original onClick handler
    onClick(row, col)
  }

  const previewCells = getPreviewCells()
  const isValid = isValidPreview()

  return (
    <div className="relative" ref={boardRef}>
      <div className="grid grid-cols-11 gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-4 rounded-lg shadow-lg transition-all duration-300">
        {/* Column headers */}
        <div className="flex justify-center items-center h-8"></div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
          <div
            key={`col-${col}`}
            className="flex justify-center items-center h-8 text-sm font-medium text-slate-500 dark:text-slate-400"
          >
            {String.fromCharCode(65 + col)}
          </div>
        ))}

        {/* Board cells with row headers */}
        {board.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Row header */}
            <div className="flex justify-center items-center w-8 text-sm font-medium text-slate-500 dark:text-slate-400">
              {rowIndex + 1}
            </div>

            {/* Cells */}
            {row.map((cell, colIndex) => {
              const isPreview = previewCells.some((p) => p.row === rowIndex && p.col === colIndex)
              const previewClass = isPreview ? (isValid ? "bg-teal-500/40" : "bg-red-500/40") : ""

              const isAnimating = lastHit && lastHit.row === rowIndex && lastHit.col === colIndex

              const cellClass = cn(
                "w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-sm transition-all duration-150 relative",
                {
                  // Hit ship
                  "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]": cell.isHit && cell.hasShip,
                  // Miss
                  "bg-slate-400 dark:bg-slate-500": cell.isHit && !cell.hasShip,
                  // Visible ship (not hit)
                  "bg-teal-600": showShips && cell.hasShip && !cell.isHit,
                  // Empty water
                  "bg-blue-200/50 hover:bg-blue-300/50 dark:bg-cyan-900/50 dark:hover:bg-cyan-800/50":
                    !cell.isHit && (!showShips || !cell.hasShip),
                  // Cursor styles
                  "cursor-pointer": gamePhase === "placement" || (gamePhase === "playing" && !cell.isHit),
                  "cursor-not-allowed": gamePhase === "playing" && cell.isHit,
                  // Animation classes
                  "animate-[fadeIn_0.3s_ease-out]": cell.isHit && !isAnimating,
                },
              )

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${cellClass} ${previewClass}`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseLeave={handleMouseLeave}
                  role="button"
                  tabIndex={0}
                  aria-label={`Grid position ${String.fromCharCode(65 + colIndex)}${rowIndex + 1}${
                    cell.isHit ? (cell.hasShip ? ", hit" : ", miss") : ""
                  }${showShips && cell.hasShip ? ", has ship" : ""}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleClick(rowIndex, colIndex)
                    }
                  }}
                >
                  {cell.isHit && (
                    <span className={`text-white font-bold ${cell.hasShip ? "text-xl" : ""}`}>
                      {cell.hasShip ? "×" : "•"}
                    </span>
                  )}

                  {/* Animations */}
                  {isAnimating && lastHit?.type === "hit" && <HitAnimation isActive={true} />}
                  {isAnimating && lastHit?.type === "miss" && <MissAnimation isActive={true} />}
                  {isAnimating && lastHit?.type === "sink" && <SinkAnimation isActive={true} />}
                  {isAnimating && lastHit?.type === "place" && <PlaceShipAnimation isActive={true} />}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Grid overlay for visual effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] rounded-lg"></div>
    </div>
  )
}
