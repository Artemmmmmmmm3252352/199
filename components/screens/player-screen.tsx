"use client"

import { useState } from "react"
import {
  ChevronLeft,
  MoreHorizontal,
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  ListPlus,
  Share2,
  Volume2,
} from "lucide-react"
import Image from "next/image"
import type { Track } from "@/lib/types"
import { BottomNav } from "../ui/bottom-nav"
import { AudioVisualizer } from "../ui/audio-visualizer"

interface PlayerScreenProps {
  track: Track
  isPlaying: boolean
  progress: number
  onProgressChange: (progress: number) => void
  onTogglePlay: () => void
  onClose: () => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function PlayerScreen({
  track,
  isPlaying,
  progress,
  onProgressChange,
  onTogglePlay,
  onClose,
}: PlayerScreenProps) {
  const [liked, setLiked] = useState(true)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const currentTime = (progress / 100) * track.duration
  const totalTime = track.duration

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black">
      {/* Background with subtle glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[50%] opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-[#C8E45C]/30 to-transparent blur-[100px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col px-6 pt-4 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="p-2 -ml-2 text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm font-medium text-white">Now Playing</span>
          <button className="p-2 -mr-2 text-white">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="relative w-full max-w-[300px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-[#333]/30">
            <Image
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop"
              alt={track.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Track Info */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{track.title}</h1>
            <p className="text-[#888]">{track.artist}</p>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 ${liked ? "text-[#C8E45C]" : "text-[#666]"}`}
          >
            <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative h-1 bg-[#333] rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#C8E45C] rounded-full"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px #C8E45C'
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C8E45C] rounded-full"
              style={{ 
                left: `calc(${progress}% - 6px)`,
                boxShadow: '0 0 8px #C8E45C'
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#888]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={`p-3 ${shuffle ? "text-[#C8E45C]" : "text-[#666]"}`}
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button className="p-3 text-white">
            <SkipBack className="w-7 h-7 fill-current" />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-16 h-16 rounded-full bg-[#C8E45C] flex items-center justify-center shadow-[0_0_25px_rgba(200,228,92,0.4)]"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-black text-black" />
            ) : (
              <Play className="w-7 h-7 fill-black text-black ml-1" />
            )}
          </button>
          <button className="p-3 text-white">
            <SkipForward className="w-7 h-7 fill-current" />
          </button>
          <button
            onClick={() => setRepeat(!repeat)}
            className={`p-3 ${repeat ? "text-[#C8E45C]" : "text-[#666]"}`}
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        {/* Secondary Controls */}
        <div className="flex items-center justify-between px-6 mb-4">
          <button className="p-2 text-[#666]">
            <ListPlus className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#666]">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#666]">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#666]">
            <Volume2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#666]">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Visualizer */}
        <AudioVisualizer isPlaying={isPlaying} />
      </div>

      {/* Bottom Nav */}
      <BottomNav currentScreen="home" onNavigate={() => {}} />
    </div>
  )
}
