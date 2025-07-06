import BattleshipGame from "@/components/battleship-game"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white p-4 antialiased transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 mb-2">
            Battleship
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Position your fleet, coordinate your attacks, and sink the enemy ships before they sink yours.
          </p>
        </header>
        <BattleshipGame />
      </div>
    </main>
  )
}
