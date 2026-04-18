"use client"

import { useState, useEffect } from "react"
import { HomeScreen } from "./screens/home-screen"
import { SearchScreen } from "./screens/search-screen"
import { LibraryScreen } from "./screens/library-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { PlayerScreen } from "./screens/player-screen"
import { BottomNav } from "./ui/bottom-nav"
import { MiniPlayer } from "./ui/mini-player"
import type { Track, Screen } from "@/lib/types"

const mockTracks: Track[] = [
  {
    id: "1",
    title: "LUNCH",
    artist: "Billie Eilish",
    album: "HIT ME HARD AND SOFT",
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HooIkqb21wYmKvfxW531OaNkBw1NdB.png",
    duration: 179,
  },
  {
    id: "2",
    title: "LET ME HARD MY DO JOINT",
    artist: "Dr. Dre",
    album: "Heffy J. Feat. Chayka",
    cover: "/covers/track2.jpg",
    duration: 245,
  },
  {
    id: "3",
    title: "UNTOLD",
    artist: "Heffy J. Feat. Chayka",
    album: "385",
    cover: "/covers/track3.jpg",
    duration: 385,
  },
  {
    id: "4",
    title: "HEROES & VILLAINS",
    artist: "3DSS",
    album: "3:89",
    cover: "/covers/track4.jpg",
    duration: 269,
  },
  {
    id: "5",
    title: "Energetic",
    artist: "FOCUZ",
    album: "3:33",
    cover: "/covers/track5.jpg",
    duration: 213,
  },
  {
    id: "6",
    title: "Relly B",
    artist: "Billie Eilish",
    album: "15M 1.2k",
    cover: "/covers/track6.jpg",
    duration: 198,
  },
]

export function MusicApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [currentTrack, setCurrentTrack] = useState<Track>(mockTracks[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(83)
  const [showFullPlayer, setShowFullPlayer] = useState(false)

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress(0)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Simulate progress
  useEffect(() => {
    if (isPlaying && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 0.5
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isPlaying, progress])

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onPlayTrack={handlePlayTrack} tracks={mockTracks} />
      case "search":
        return <SearchScreen onPlayTrack={handlePlayTrack} tracks={mockTracks} />
      case "explore":
        return <SearchScreen onPlayTrack={handlePlayTrack} tracks={mockTracks} />
      case "library":
        return <LibraryScreen onPlayTrack={handlePlayTrack} tracks={mockTracks} />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeScreen onPlayTrack={handlePlayTrack} tracks={mockTracks} />
    }
  }

  if (showFullPlayer) {
    return (
      <PlayerScreen
        track={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        onProgressChange={setProgress}
        onTogglePlay={togglePlay}
        onClose={() => setShowFullPlayer(false)}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {renderScreen()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <MiniPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          onTogglePlay={togglePlay}
          onClick={() => setShowFullPlayer(true)}
        />
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    </div>
  )
}
