import type { GamePhase, Player } from "@/lib/types"
import { AlertCircle, Crosshair } from "lucide-react"
import { cn } from "@/lib/utils"

interface GameStatusProps {
  message: string
  currentPlayer: Player
  gamePhase: GamePhase
}

export default function GameStatus({ message, currentPlayer, gamePhase }: GameStatusProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-6">
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-lg animate-[fadeIn_0.5s_ease-out]">
        <div className="flex items-center gap-3">
          {gamePhase === "playing" && (
            <div className="flex items-center mr-2 animate-[slideIn_0.5s_ease-out]">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full mr-2 transition-all duration-500",
                  currentPlayer === "player"
                    ? "bg-teal-100/80 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 animate-[pulse_2s_infinite]"
                    : "bg-red-100/80 text-red-600 dark:bg-red-500/20 dark:text-red-400 animate-[pulse_2s_infinite]",
                )}
              >
                <Crosshair
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    currentPlayer === "player" ? "animate-[bounce_2s_ease-in-out_infinite]" : "",
                  )}
                />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">CURRENT TURN</div>
                <div
                  className={cn(
                    "font-bold transition-colors duration-300",
                    currentPlayer === "player" ? "text-teal-600 dark:text-teal-400" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {currentPlayer === "player" ? "Your Turn" : "Enemy Turn"}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start flex-1">
            <AlertCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-slate-700 dark:text-slate-200">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
