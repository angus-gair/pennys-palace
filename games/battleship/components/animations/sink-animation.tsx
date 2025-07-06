"use client"

import { useEffect, useState } from "react"

interface SinkAnimationProps {
  isActive: boolean
}

export function SinkAnimation({ isActive }: SinkAnimationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isActive) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!show) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Sinking effect with bubbles */}
      <div className="absolute inset-0 bg-teal-600 rounded-sm animate-[sink_1.5s_ease-in-out_forwards]"></div>

      {/* Bubbles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-cyan-300/70 rounded-full w-1.5 h-1.5"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `fadeIn 0.3s ease-out forwards, 
                       sink ${0.8 + Math.random() * 0.7}s ease-in-out ${Math.random() * 0.5}s forwards`,
          }}
        ></div>
      ))}
    </div>
  )
}
