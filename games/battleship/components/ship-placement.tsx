"use client"

import { useState } from "react"
import type { Ship } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShipPlacementProps {
  ships: Ship[]
  selectShip: (ship: Ship) => void
  currentShip: Ship | null
  orientation: "horizontal" | "vertical"
  toggleOrientation: () => void
}

export default function ShipPlacement({
  ships,
  selectShip,
  currentShip,
  orientation,
  toggleOrientation,
}: ShipPlacementProps) {
  const [isRotating, setIsRotating] = useState(false)

  // Handle orientation toggle with animation
  const handleToggleOrientation = () => {
    setIsRotating(true)
    setTimeout(() => {
      toggleOrientation()
      setIsRotating(false)
    }, 300)
  }

  // Ship icons/representations
  const getShipIcon = (size: number, isPlaced: boolean, isSelected: boolean) => {
    const segments = []
    const baseClass = "h-6 rounded-sm transition-all duration-300"

    for (let i = 0; i < size; i++) {
      const isEnd = i === 0 || i === size - 1
      const segmentClass = cn(baseClass, {
        "bg-teal-600 dark:bg-teal-600": isPlaced,
        "bg-cyan-600 dark:bg-cyan-500": !isPlaced && isSelected,
        "bg-slate-400 dark:bg-slate-600": !isPlaced && !isSelected,
        "rounded-l-md": i === 0,
        "rounded-r-md": i === size - 1,
        "w-6": orientation === "vertical",
        "w-full": orientation === "horizontal",
      })

      segments.push(<div key={i} className={segmentClass}></div>)
    }

    return (
      <div
        className={cn(
          `flex gap-0.5 w-full h-full transition-all duration-300`,
          orientation === "horizontal" ? "flex-row" : "flex-col",
          isRotating ? "scale-90 opacity-80" : "",
        )}
      >
        {segments}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">Ship Orientation:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleOrientation}
          className="flex items-center gap-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 transition-all duration-300"
        >
          {orientation === "horizontal" ? "Horizontal" : "Vertical"}
          <RotateCw
            className={cn(
              "w-4 h-4 ml-1 transition-transform duration-300",
              isRotating ? "animate-[rotate_0.3s_ease-in-out]" : "",
            )}
          />
        </Button>
      </div>

      <div className="space-y-3">
        {ships.map((ship) => (
          <div
            key={ship.id}
            onClick={() => !ship.placed && selectShip(ship)}
            className={cn(
              "flex items-center p-3 rounded-lg transition-all duration-300",
              {
                "bg-slate-200/70 dark:bg-slate-700/50 cursor-not-allowed opacity-60": ship.placed,
                "bg-slate-200/70 dark:bg-slate-700 hover:bg-slate-300/70 dark:hover:bg-slate-600 cursor-pointer hover:translate-x-1":
                  !ship.placed && currentShip?.id !== ship.id,
                "bg-cyan-100/70 dark:bg-cyan-900/70 ring-2 ring-cyan-600 dark:ring-cyan-500 animate-[pulse_2s_infinite]":
                  currentShip?.id === ship.id,
              },
              ship.placed ? "" : "animate-[fadeIn_0.5s_ease-out]",
            )}
            role="button"
            tabIndex={ship.placed ? -1 : 0}
            aria-label={`Select ${ship.name}, length ${ship.size}${ship.placed ? ", already placed" : ""}`}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !ship.placed) {
                selectShip(ship)
              }
            }}
          >
            <div className="flex-1 mr-3">
              <div className="font-medium">{ship.name}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Length: {ship.size}</div>
            </div>
            <div className="w-24 h-6">{getShipIcon(ship.size, ship.placed, currentShip?.id === ship.id)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
