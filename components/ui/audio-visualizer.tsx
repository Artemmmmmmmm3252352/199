"use client"

import { useEffect, useState } from "react"

interface AudioVisualizerProps {
  isPlaying: boolean
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const [bars, setBars] = useState<number[]>([])
  const [time, setTime] = useState(0)

  useEffect(() => {
    // Generate smooth wave pattern
    const generateBars = () => {
      setTime(t => t + 1)
      const newBars = Array.from({ length: 80 }, (_, i) => {
        // Create a wave pattern
        const wave1 = Math.sin((i * 0.15) + (time * 0.1)) * 0.3
        const wave2 = Math.sin((i * 0.08) + (time * 0.15)) * 0.2
        const wave3 = Math.sin((i * 0.2) + (time * 0.05)) * 0.15
        const random = Math.random() * 0.2
        return Math.max(0.1, Math.min(1, 0.4 + wave1 + wave2 + wave3 + (isPlaying ? random : 0)))
      })
      setBars(newBars)
    }

    generateBars()

    if (isPlaying) {
      const interval = setInterval(generateBars, 80)
      return () => clearInterval(interval)
    }
  }, [isPlaying, time])

  return (
    <div className="relative h-20 flex items-end justify-center gap-[2px] px-2 overflow-hidden">
      {/* Glow effect underneath */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl opacity-40"
        style={{ background: 'radial-gradient(ellipse at center, #C8E45C 0%, transparent 70%)' }}
      />
      
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-[3px] rounded-full transition-all duration-100 ease-out"
          style={{
            height: isPlaying ? `${height * 100}%` : "15%",
            background: `linear-gradient(to top, rgba(200, 228, 92, 0.2), rgba(200, 228, 92, ${0.5 + height * 0.5}), rgba(200, 228, 92, ${0.3 + height * 0.7}))`,
            boxShadow: isPlaying ? `0 0 ${4 + height * 6}px rgba(200, 228, 92, ${height * 0.5})` : 'none',
            opacity: isPlaying ? 0.5 + height * 0.5 : 0.3,
          }}
        />
      ))}
    </div>
  )
}
