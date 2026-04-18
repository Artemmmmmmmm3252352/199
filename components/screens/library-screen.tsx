"use client"

import { useState } from "react"
import { Plus, Grid3X3, List, Clock, Heart, Download, Music } from "lucide-react"
import Image from "next/image"
import type { Track } from "@/lib/types"

interface LibraryScreenProps {
  onPlayTrack: (track: Track) => void
  tracks: Track[]
}

const playlists = [
  {
    id: "1",
    title: "Liked Songs",
    count: 234,
    icon: Heart,
    color: "bg-gradient-to-br from-[#C8E45C]/40 to-[#C8E45C]/10",
  },
  {
    id: "2",
    title: "Recently Played",
    count: 50,
    icon: Clock,
    color: "bg-gradient-to-br from-blue-500/40 to-blue-500/10",
  },
  {
    id: "3",
    title: "Downloaded",
    count: 128,
    icon: Download,
    color: "bg-gradient-to-br from-emerald-500/40 to-emerald-500/10",
  },
]

const userPlaylists = [
  {
    id: "1",
    title: "Chill Vibes",
    songs: 45,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "Workout Mix",
    songs: 32,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "Late Night",
    songs: 28,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    title: "Road Trip",
    songs: 67,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop",
  },
]

export function LibraryScreen({ onPlayTrack, tracks }: LibraryScreenProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  return (
    <div className="min-h-screen bg-black px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Your Library</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 text-[#666]"
          >
            {viewMode === "grid" ? (
              <List className="w-5 h-5" />
            ) : (
              <Grid3X3 className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 text-[#666]">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-3 text-left border border-[#333]/30"
          >
            <div className={`w-12 h-12 rounded-lg ${playlist.color} flex items-center justify-center`}>
              <playlist.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-white truncate">{playlist.title}</h3>
              <p className="text-xs text-[#888]">{playlist.count} songs</p>
            </div>
          </button>
        ))}
        <button className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-3 text-left border-2 border-dashed border-[#333]">
          <div className="w-12 h-12 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
            <Plus className="w-5 h-5 text-[#666]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-white">Create Playlist</h3>
            <p className="text-xs text-[#888]">Add your songs</p>
          </div>
        </button>
      </div>

      {/* Playlists */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Playlists</h2>

        {viewMode === "list" ? (
          <div className="space-y-4">
            {userPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                className="w-full flex items-center gap-3 text-left"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                  <Image
                    src={playlist.cover}
                    alt={playlist.title}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{playlist.title}</h3>
                  <p className="text-sm text-[#888]">{playlist.songs} songs</p>
                </div>
                <Music className="w-4 h-4 text-[#666]" />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {userPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                className="text-left"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#2a2a2a] mb-2">
                  <Image
                    src={playlist.cover}
                    alt={playlist.title}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-semibold text-sm text-white truncate">{playlist.title}</h3>
                <p className="text-xs text-[#888]">{playlist.songs} songs</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
