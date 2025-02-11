"use client"

import { useEffect, useState } from "react"

export default function MouseMoveEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
      setIsMoving(true)

      clearTimeout(timeout)
      timeout = setTimeout(() => setIsMoving(false), 150)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-30 mix-blend-soft-light transition-opacity duration-300"
      style={{
        opacity: isMoving ? 1 : 0,
        width: "80px",
        height: "80px",
        background: `radial-gradient(circle at center, rgba(255, 204, 176, 0.3) 0%, transparent 70%)`,
        transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`,
      }}
    />
  )
}

