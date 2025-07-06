"use client"

import { useEffect, useState } from "react"

interface MissAnimationProps {
  isActive: boolean
}

export function MissAnimation({ isActive }: MissAnimationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isActive) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!show) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Ripple effect */}
      <div className="absolute w-full h-full flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-cyan-400/60"
            style={{
              width: "30%",
              height: "30%",
              animationDelay: `${i * 0.15}s`,
              animation: "ripple 0.8s ease-out forwards",
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
