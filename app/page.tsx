"use client"

import { useState } from "react"
import { MobileFrame } from "@/components/mobile-frame"
import { BottomNav } from "@/components/bottom-nav"
import { MiniPlayer } from "@/components/mini-player"
import { HomeScreen } from "@/components/home-screen"
import { PlayerScreen } from "@/components/player-screen"

export default function MusicApp() {
  const [activeTab, setActiveTab] = useState<"home" | "search" | "library" | "profile">("home")
  const [showPlayer, setShowPlayer] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  const currentTrack = {
    title: "LUNCH",
    artist: "Billie Eilish",
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000003914724395067f5b5dca4e27-VqNegr23iGq3M7ypqWeoEgEl1rURW3.png",
    currentTime: "2:37",
    progress: 88,
  }

  return (
    <MobileFrame>
      <div className="relative h-full">
        {/* Main content */}
        <HomeScreen onOpenPlayer={() => setShowPlayer(true)} />

        {/* Mini player */}
        {!showPlayer && (
          <MiniPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onExpand={() => setShowPlayer(true)}
          />
        )}

        {/* Bottom navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Full player screen */}
        {showPlayer && (
          <PlayerScreen
            onClose={() => setShowPlayer(false)}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
          />
        )}
      </div>
    </MobileFrame>
  )
}
