"use client"

import { Play, Pause } from "lucide-react"
import Image from "next/image"
import type { Track } from "@/lib/types"

interface MiniPlayerProps {
  track: Track
  isPlaying: boolean
  progress: number
  onTogglePlay: () => void
  onClick: () => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function MiniPlayer({
  track,
  isPlaying,
  progress,
  onTogglePlay,
  onClick,
}: MiniPlayerProps) {
  const currentTime = (progress / 100) * track.duration

  return (
    <div className="relative mx-2 mb-1">
      {/* Background with gradient */}
      <div
        onClick={onClick}
        className="relative bg-[#1a1a1a]/95 backdrop-blur-lg rounded-2xl overflow-hidden cursor-pointer border border-[#333]/30"
      >
        {/* Audio wave visualization background */}
        <div className="absolute inset-0 flex items-end justify-center opacity-40 px-4 pointer-events-none">
          <svg
            viewBox="0 0 300 50"
            className="w-full h-12"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="miniWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C8E45C" stopOpacity="0.8" />
                <stop offset={`${progress}%`} stopColor="#C8E45C" stopOpacity="1" />
                <stop offset={`${progress + 1}%`} stopColor="#C8E45C" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#C8E45C" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Animated wave line */}
            <path
              d="M0,25 Q15,15 30,25 T60,25 T90,20 T120,30 T150,25 T180,20 T210,30 T240,25 T270,20 T300,25"
              fill="none"
              stroke="url(#miniWaveGradient)"
              strokeWidth="2"
              filter="url(#glow)"
              className="wave-path"
            />
          </svg>
        </div>

        <div className="relative flex items-center gap-3 p-3">
          {/* Album Art */}
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#2a2a2a] flex-shrink-0 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop"
              alt={track.title}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate text-white">{track.title}</h3>
            <p className="text-xs text-[#888] truncate">{track.artist}</p>
          </div>

          {/* Progress indicator with glow */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-1 bg-[#333] rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#C8E45C] transition-all duration-300 relative"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 8px #C8E45C, 0 0 15px rgba(200, 228, 92, 0.5)'
                }}
              />
            </div>
            <span className="text-xs text-[#888] w-10 text-right">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onTogglePlay()
            }}
            className="w-11 h-11 rounded-full bg-[#C8E45C] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(200,228,92,0.4)]"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black text-black" />
            ) : (
              <Play className="w-5 h-5 fill-black text-black ml-0.5" />
            )}
          </button>
        </div>

        {/* Progress bar at bottom with glow */}
        <div className="h-0.5 bg-[#222]">
          <div
            className="h-full bg-[#C8E45C] transition-all duration-300"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 6px #C8E45C'
            }}
          />
        </div>
      </div>
    </div>
  )
}
