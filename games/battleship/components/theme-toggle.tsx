"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme toggle with explicit theme setting
  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light")
      // Force apply light theme if needed
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else {
      setTheme("dark")
      // Force apply dark theme if needed
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
    }
    console.log("Theme toggled to:", resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
