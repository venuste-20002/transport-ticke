"use client"
import React, { useRef, useState, useEffect } from "react"
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface CanvasRevealEffectProps {
  animationSpeed?: number
  opacities?: number[]
  colors?: number[][]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsMounted(true)
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const draw = (time: number) => {
      if (!canvas.parentElement) return
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const totalSize = 4
      const cols = Math.ceil(canvas.width / totalSize)
      const rows = Math.ceil(canvas.height / totalSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * totalSize
          const y = j * totalSize
          const seed = (i * 1000 + j) / (cols * rows)
          const random = Math.sin(seed * 12345.6789) * 0.5 + 0.5
          const opacityIndex = Math.floor(random * opacities.length)
          let opacity = opacities[opacityIndex]

          const progress = (time * 0.001 * animationSpeed) % 1
          const distance = Math.sqrt(
            Math.pow(x - canvas.width/2, 2) + 
            Math.pow(y - canvas.height/2, 2)
          )
          const maxDistance = Math.sqrt(
            Math.pow(canvas.width/2, 2) + 
            Math.pow(canvas.height/2, 2)
          )
          const revealProgress = progress * maxDistance
          opacity *= distance < revealProgress ? 1 : 0

          if (opacity > 0) {
            const colorIndex = Math.floor(random * colors.length)
            const [r, g, b] = colors[colorIndex]
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
            ctx.fillRect(x, y, dotSize, dotSize)
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [animationSpeed, colors, dotSize, opacities])

  if (!isMounted) {
    return (
      <div className={cn("h-full relative bg-black w-full", containerClassName)}>
        <div className="text-white">Loading effect...</div>
      </div>
    )
  }

  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      {showGradient && <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />}
    </div>
  )
}

export const HeroWithCanvasReveal = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="text-white">Loading canvas effect...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <CanvasRevealEffect
          animationSpeed={2}
          containerClassName="bg-black"
          colors={[
            [0, 180, 0],
            [0, 220, 0], 
            [100, 255, 100],
          ]}
          dotSize={3}
          opacities={[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1]}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Welcome to our Transport-Ticket
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
          Experience the power of our innovative solutions.
        </p>
        <div className="mt-10">
          <button className="bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
