"use client"

import { useEffect, useState } from "react"

interface PlaceShipAnimationProps {
  isActive: boolean
}

export function PlaceShipAnimation({ isActive }: PlaceShipAnimationProps) {
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
      {/* Placement effect */}
      <div className="absolute inset-0 bg-teal-500/20 rounded-sm animate-[pulse_0.6s_ease-out_forwards]"></div>
    </div>
  )
}
