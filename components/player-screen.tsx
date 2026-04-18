"use client"

import { ArrowLeft, MoreHorizontal, Heart, Shuffle, SkipBack, Pause, Play, SkipForward, Repeat, ListVideo, ListMusic, Volume2 } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface PlayerScreenProps {
  onClose: () => void
  isPlaying: boolean
  onPlayPause: () => void
}

export function PlayerScreen({ onClose, isPlaying, onPlayPause }: PlayerScreenProps) {
  const [progress, setProgress] = useState(47)
  const [isLiked, setIsLiked] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  // Audio visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      if (isPlaying) {
        time += 0.02
      }

      // Draw flowing waves
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath()
        ctx.moveTo(0, rect.height)

        const waveOffset = wave * 0.5
        const alpha = 0.3 - wave * 0.08

        for (let x = 0; x <= rect.width; x += 2) {
          const y =
            rect.height * 0.5 +
            Math.sin((x / rect.width) * 4 + time + waveOffset) * 25 +
            Math.sin((x / rect.width) * 8 + time * 1.5 + waveOffset) * 15 +
            Math.sin((x / rect.width) * 2 + time * 0.5 + waveOffset) * 10

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.lineTo(rect.width, rect.height)
        ctx.lineTo(0, rect.height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
        gradient.addColorStop(0, `rgba(184, 230, 54, ${alpha * 0.5})`)
        gradient.addColorStop(0.3, `rgba(210, 200, 80, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(255, 215, 0, ${alpha * 1.2})`)
        gradient.addColorStop(0.7, `rgba(210, 200, 80, ${alpha})`)
        gradient.addColorStop(1, `rgba(184, 230, 54, ${alpha * 0.5})`)

        ctx.fillStyle = gradient
        ctx.fill()

        // Glow effect on waves
        ctx.strokeStyle = `rgba(255, 230, 100, ${alpha * 0.8})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw vertical bars
      const barCount = 50
      const barWidth = rect.width / barCount
      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth + barWidth / 2
        const baseHeight = 
          Math.sin(i * 0.3 + time * 2) * 20 +
          Math.sin(i * 0.5 + time * 3) * 15 +
          30

        const height = isPlaying ? baseHeight : 5
        const y = rect.height * 0.5 - height / 2

        const gradient = ctx.createLinearGradient(x, y + height, x, y)
        gradient.addColorStop(0, "rgba(184, 230, 54, 0.2)")
        gradient.addColorStop(0.5, "rgba(255, 215, 0, 0.6)")
        gradient.addColorStop(1, "rgba(255, 230, 100, 0.9)")

        ctx.fillStyle = gradient
        ctx.fillRect(x - 1, y, 2, height)

        // Top glow dot
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 200, 0.8)"
        ctx.fill()
      }

      // Draw sparkles/particles
      for (let i = 0; i < 30; i++) {
        const px = (Math.sin(i * 0.7 + time * 0.5) * 0.5 + 0.5) * rect.width
        const py = (Math.cos(i * 0.9 + time * 0.3) * 0.3 + 0.5) * rect.height
        const size = Math.sin(i + time * 2) * 1.5 + 2

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 200, ${0.3 + Math.sin(i + time) * 0.2})`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden">
      {/* Background with cosmic effect */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(100, 120, 60, 0.4) 0%, transparent 60%),
              radial-gradient(ellipse at 30% 70%, rgba(80, 100, 50, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(60, 80, 40, 0.2) 0%, transparent 50%)
            `,
          }}
        />
        {/* Stars/particles overlay */}
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-lime-200/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main container card */}
      <div className="relative flex flex-col h-full mx-4 my-6 rounded-[2.5rem] overflow-hidden"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(40, 45, 35, 0.85) 0%, 
              rgba(25, 30, 20, 0.9) 50%,
              rgba(15, 18, 12, 0.95) 100%
            )
          `,
          border: '1px solid rgba(184, 230, 54, 0.15)',
          boxShadow: `
            0 0 60px rgba(184, 230, 54, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <button onClick={onClose} className="p-2 -ml-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button className="p-2 -mr-2 text-white/80 hover:text-white transition-colors">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex items-center justify-center px-8 py-4 min-h-0">
          <div 
            className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden"
            style={{
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 0 30px rgba(100, 120, 60, 0.2)
              `,
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000003914724395067f5b5dca4e27-Ek3G0eYnKEscPHey7Pw4T1VotXQOVS.png"
              alt="LUNCH - Billie Eilish"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
        </div>

        {/* Track Info */}
        <div className="px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">LUNCH</h1>
              <p className="text-white/60 text-sm">Billie Eilish</p>
            </div>
            <button onClick={() => setIsLiked(!isLiked)} className="p-1">
              <Heart 
                className={`w-7 h-7 transition-all ${isLiked ? 'text-[#B8E636] fill-[#B8E636]' : 'text-white/60'}`}
              />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-5">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full relative"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #B8E636, #D4E157)',
                }}
              >
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                  style={{ boxShadow: '0 0 10px rgba(184, 230, 54, 0.5)' }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/50">
              <span>1:23</span>
              <span>2:59</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 text-[#B8E636] hover:scale-110 transition-transform">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#B8E636] hover:scale-110 transition-transform">
              <SkipBack className="w-7 h-7" fill="currentColor" />
            </button>
            <button 
              onClick={onPlayPause}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #C5E063 0%, #B8E636 50%, #A5D62E 100%)',
                boxShadow: '0 0 30px rgba(184, 230, 54, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)',
              }}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-black" fill="currentColor" />
              ) : (
                <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
              )}
            </button>
            <button className="p-2 text-[#B8E636] hover:scale-110 transition-transform">
              <SkipForward className="w-7 h-7" fill="currentColor" />
            </button>
            <button className="p-2 text-[#B8E636] hover:scale-110 transition-transform">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Visualizer Canvas */}
        <div className="h-28 relative">
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.9 }}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-around px-8 py-4 border-t border-white/10">
          <button className="p-3 text-white/50 hover:text-white/80 transition-colors">
            <ListVideo className="w-5 h-5" />
          </button>
          <button className="p-3 text-white/50 hover:text-white/80 transition-colors">
            <ListMusic className="w-5 h-5" />
          </button>
          <button className="p-3 text-white/50 hover:text-white/80 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-3 text-white/50 hover:text-white/80 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <button className="p-3 text-white/50 hover:text-white/80 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
