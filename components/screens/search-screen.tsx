"use client"

import { useState } from "react"
import { Search, Menu, ChevronRight, Pause } from "lucide-react"
import Image from "next/image"
import type { Track } from "@/lib/types"

interface SearchScreenProps {
  onPlayTrack: (track: Track) => void
  tracks: Track[]
}

const newReleases = [
  {
    id: "1",
    title: "LET ME HARD MY DO JOINT",
    artist: "Dr. Dre",
    feature: "Heffy J. Feat. Chayka",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "UNTOLD",
    artist: "Heffy J. Feat. Chayka",
    feature: "385",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "HEROES & VILLAINS",
    artist: "3DSS",
    feature: "3:89",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop",
  },
]

const newAlbums = [
  {
    id: "1",
    title: "Energetic",
    artist: "FOCUZ",
    duration: "3:33",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "Relly B",
    artist: "Billie Eilish",
    duration: "15M 1.2k",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "LUNCH",
    artist: "Billie Eilish",
    duration: "2:57",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
    isPlaying: true,
  },
]

export function SearchScreen({ onPlayTrack, tracks }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-black px-4 pt-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 text-white">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center gap-3 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-full px-4 py-2.5 border border-[#333]/50">
          <Search className="w-4 h-4 text-[#666]" />
          <input
            type="text"
            placeholder="What do you want to re..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#666]"
          />
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#444]">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>

      {/* New releases - List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">New releases</h2>
          <ChevronRight className="w-5 h-5 text-[#666]" />
        </div>

        <div className="space-y-4">
          {newReleases.map((release) => (
            <button
              key={release.id}
              onClick={() => onPlayTrack(tracks[0])}
              className="w-full flex items-center gap-3 text-left"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                <Image
                  src={release.cover}
                  alt={release.title}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-white truncate">{release.title}</h3>
                <p className="text-xs text-[#888]">{release.artist}</p>
                <p className="text-xs text-[#666]">{release.feature}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* New releases - Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">New releases</h2>
          <button className="text-xs text-[#C8E45C]">Show all</button>
        </div>

        <div className="space-y-4">
          {newAlbums.map((album) => (
            <button
              key={album.id}
              onClick={() => onPlayTrack(tracks[0])}
              className="w-full flex items-center gap-3 text-left"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#2a2a2a] flex-shrink-0 relative">
                <Image
                  src={album.cover}
                  alt={album.title}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white truncate">{album.title}</h3>
                <p className="text-sm text-[#888]">{album.artist}</p>
                <p className="text-xs text-[#666]">{album.duration}</p>
              </div>
              {album.isPlaying && (
                <div className="flex items-center gap-3">
                  {/* Progress bar mini */}
                  <div className="w-24 h-1 bg-[#333] rounded-full overflow-hidden">
                    <div 
                      className="w-1/2 h-full bg-[#C8E45C]" 
                      style={{ boxShadow: '0 0 6px #C8E45C' }}
                    />
                  </div>
                  <button className="w-11 h-11 rounded-full bg-[#C8E45C] flex items-center justify-center shadow-[0_0_15px_rgba(200,228,92,0.4)]">
                    <Pause className="w-5 h-5 fill-black text-black" />
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
