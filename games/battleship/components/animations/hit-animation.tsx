"use client"

import { useEffect, useState } from "react"

interface HitAnimationProps {
  isActive: boolean
}

export function HitAnimation({ isActive }: HitAnimationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isActive) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!show) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-full h-full">
        {/* Explosion effect */}
        <div className="absolute inset-0 bg-red-500/30 rounded-sm animate-[explosion_0.6s_ease-out_forwards]"></div>
        {/* Radial lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-orange-500/70"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-8px)`,
                animation: "explosion 0.6s ease-out forwards",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
