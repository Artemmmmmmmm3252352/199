"use client"

import { Pause, Play } from "lucide-react"
import Image from "next/image"

interface MiniPlayerProps {
  track: {
    title: string
    artist: string
    cover: string
    currentTime: string
    progress: number
  }
  isPlaying: boolean
  onPlayPause: () => void
  onExpand: () => void
}

export function MiniPlayer({ track, isPlaying, onPlayPause, onExpand }: MiniPlayerProps) {
  return (
    <div 
      className="absolute bottom-20 left-3 right-3 h-16 bg-card/90 backdrop-blur-xl rounded-xl border border-border/50 overflow-hidden cursor-pointer"
      onClick={onExpand}
    >
      {/* Progress bar background */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${track.progress}%` }}
        />
      </div>
      
      <div className="flex items-center gap-3 h-full px-3">
        {/* Album art */}
        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={track.cover}
            alt={track.title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{track.title}</p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        </div>
        
        {/* Time */}
        <span className="text-xs text-muted-foreground mr-2">{track.currentTime}</span>
        
        {/* Play/Pause button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPlayPause()
          }}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary-foreground" fill="currentColor" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  )
}
