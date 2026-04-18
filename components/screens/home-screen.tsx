"use client"

import { useState } from "react"
import { Search, ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import type { Track, DailyMix } from "@/lib/types"

interface HomeScreenProps {
  onPlayTrack: (track: Track) => void
  tracks: Track[]
}

const categories = ["For you", "New", "Charts", "Mood"]

const dailyMixes: DailyMix[] = [
  {
    id: "1",
    number: 1,
    artists: ["Billie Eilish", "Dr. Dre"],
    description: "A mix of pop hits",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    genre: "Pop",
  },
  {
    id: "2",
    number: 2,
    artists: ["Electronic", "Chill", "Beats"],
    description: "A mix of fresh tunes",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    genre: "Electronic",
  },
  {
    id: "3",
    number: 3,
    artists: ["Indie", "Dark Pop", "Alt"],
    description: "A more triones",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    genre: "Indie",
  },
  {
    id: "4",
    number: 4,
    artists: ["Hip Hop", "Rap", "R&B"],
    description: "Urban vibes",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    genre: "Hip Hop",
  },
]

export function HomeScreen({ onPlayTrack, tracks }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState("For you")

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative">
        {/* Starfield/cosmic background */}
        <div 
          className="absolute inset-0 h-[450px]"
          style={{
            background: `
              radial-gradient(ellipse at 70% 20%, rgba(200, 228, 92, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 40%, rgba(180, 200, 80, 0.1) 0%, transparent 40%),
              linear-gradient(to bottom, #0a0a0a 0%, #000000 100%)
            `,
          }}
        />
        
        {/* Scattered stars effect */}
        <div className="absolute inset-0 h-[450px] overflow-hidden">
          <div className="absolute top-[15%] right-[25%] w-1 h-1 bg-[#C8E45C] rounded-full opacity-80" />
          <div className="absolute top-[25%] right-[15%] w-0.5 h-0.5 bg-[#C8E45C] rounded-full opacity-60" />
          <div className="absolute top-[20%] right-[35%] w-0.5 h-0.5 bg-white rounded-full opacity-40" />
          <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 bg-[#C8E45C] rounded-full opacity-70 blur-[1px]" />
          <div className="absolute top-[18%] right-[30%] w-0.5 h-0.5 bg-white rounded-full opacity-50" />
          <div className="absolute top-[35%] right-[40%] w-0.5 h-0.5 bg-[#C8E45C] rounded-full opacity-40" />
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-16 right-8 w-40 h-40 bg-[#C8E45C]/10 rounded-full blur-[80px]" />
        <div className="absolute top-32 right-16 w-32 h-32 bg-[#a8c44c]/8 rounded-full blur-[60px]" />
        
        <div className="relative px-4 pt-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-[#1a1a1a]/80 backdrop-blur-sm rounded-full px-4 py-3 border border-[#333]/50">
              <Search className="w-5 h-5 text-[#666]" />
              <span className="text-[#666] text-sm">What do you want to listen to?</span>
            </div>
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#444]">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="Profile"
                width={44}
                height={44}
                className="object-cover"
              />
            </div>
          </div>

          {/* Greeting */}
          <div className="mt-10">
            <p className="text-[#888] text-xs tracking-[0.2em] uppercase">Good Morning</p>
            <h1 className="text-[42px] font-bold mt-3 leading-[1.1] tracking-tight">
              Soundtrack<br />
              your <span className="text-[#C8E45C]">world</span>
            </h1>
          </div>

          {/* Play Button */}
          <button className="mt-8 flex items-center gap-2.5 bg-[#C8E45C] text-black px-10 py-3.5 rounded-full font-semibold text-base shadow-[0_0_20px_rgba(200,228,92,0.3)]">
            <Play className="w-5 h-5 fill-current" />
            Play
          </button>

          {/* Categories */}
          <div className="flex gap-2.5 mt-8 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-[#C8E45C] text-black"
                    : "bg-transparent border border-[#444] text-white hover:border-[#666]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Made for you section */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Made for you</h2>
          <ChevronRight className="w-5 h-5 text-[#666]" />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
          {dailyMixes.map((mix) => (
            <div
              key={mix.id}
              className="flex-shrink-0 w-[160px] rounded-xl overflow-hidden bg-[#1a1a1a]"
            >
              <div className="relative aspect-square">
                <Image
                  src={mix.cover}
                  alt={`Daily Mix ${mix.number}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-bold text-sm text-white">Daily Mix {mix.number}</h3>
                  <p className="text-xs text-[#888] mt-0.5 line-clamp-1">
                    {mix.artists.join(", ")}
                  </p>
                  <p className="text-xs text-[#666] line-clamp-1">
                    {mix.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Home / Recently Played */}
      <div className="px-4 mt-8 pb-4">
        <h2 className="text-xl font-bold text-white mb-4">Home</h2>
        
        <div className="space-y-3">
          {tracks.slice(0, 3).map((track, index) => (
            <button
              key={track.id}
              onClick={() => onPlayTrack(track)}
              className="w-full flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-3 text-left border border-[#333]/30"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                <Image
                  src={[
                    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
                    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
                  ][index % 3]}
                  alt={track.title}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{track.title}</h3>
                <p className="text-sm text-[#888] truncate">{track.artist}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#666]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
