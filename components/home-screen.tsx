"use client"

import { Search, ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HomeScreenProps {
  onOpenPlayer: () => void
}

const categories = ["For you", "New", "Charts", "Mood"]

const dailyMixes = [
  {
    id: 1,
    title: "Daily Mix 1",
    artists: "Billie Eilish, Dr. Dre",
    description: "A mix of pop hits",
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000003914724395067f5b5dca4e27-Ek3G0eYnKEscPHey7Pw4T1VotXQOVS.png",
    icon: "note",
  },
  {
    id: 2,
    title: "Daily Mix 2",
    artists: "Electronic, Chill, Beats",
    description: "A mix of fresh tunes",
    cover: "/mix2.jpg",
    icon: "headphones",
  },
  {
    id: 3,
    title: "Daily Mix 3",
    artists: "Indie, Dark Pop, Alt",
    description: "A more triones",
    cover: "/mix3.jpg",
    icon: "circle",
  },
]

export function HomeScreen({ onOpenPlayer }: HomeScreenProps) {
  return (
    <div className="h-full overflow-y-auto pb-40 relative">
      {/* Cosmic background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 70% 20%, rgba(150, 160, 80, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 60%, rgba(100, 120, 50, 0.15) 0%, transparent 40%),
              radial-gradient(ellipse at 80% 80%, rgba(80, 100, 40, 0.1) 0%, transparent 30%),
              black
            `,
          }}
        />
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-lime-300/40 rounded-full animate-pulse"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative pt-12">
        {/* Search bar */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="flex-1 flex items-center gap-3 rounded-full px-4 py-3"
              style={{
                background: 'rgba(60, 65, 50, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(184, 230, 54, 0.1)',
              }}
            >
              <Search className="w-5 h-5 text-white/40" />
              <span className="text-sm text-white/40">What do you want to listen to?</span>
            </div>
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src="/avatar.jpg"
                alt="Profile"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Hero section */}
        <div className="px-4 py-4 relative">
          <p className="text-[#B8E636] text-xs font-semibold tracking-widest mb-2">GOOD MORNING</p>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Soundtrack<br />
            your <span className="text-[#B8E636]">world</span>
          </h1>
          <button 
            className="flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-black"
            style={{
              background: 'linear-gradient(135deg, #C5E063 0%, #B8E636 50%, #A5D62E 100%)',
              boxShadow: '0 4px 20px rgba(184, 230, 54, 0.3)',
            }}
          >
            <Play className="w-5 h-5" fill="currentColor" />
            Play
          </button>
        </div>

        {/* Categories */}
        <div className="px-4 mb-6 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  i === 0
                    ? "text-black"
                    : "text-white/80 hover:text-white"
                )}
                style={i === 0 ? {
                  background: 'linear-gradient(135deg, #C5E063 0%, #B8E636 100%)',
                } : {
                  background: 'rgba(60, 65, 50, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Made for you section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-bold text-white">Made for you</h2>
            <ChevronRight className="w-5 h-5 text-white/40" />
          </div>
          
          <div className="flex gap-3 overflow-x-auto px-4 pb-2">
            {dailyMixes.map((mix) => (
              <div 
                key={mix.id} 
                className="flex-shrink-0 w-40 cursor-pointer group"
                onClick={onOpenPlayer}
              >
                <div 
                  className="relative w-40 h-40 rounded-xl overflow-hidden mb-3"
                  style={{
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <Image
                    src={mix.cover}
                    alt={mix.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Icon overlay */}
                  <div 
                    className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {mix.icon === "note" && (
                      <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    )}
                    {mix.icon === "headphones" && (
                      <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
                      </svg>
                    )}
                    {mix.icon === "circle" && (
                      <div className="w-3 h-3 rounded-full bg-white/80" />
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-white">{mix.title}</h3>
                <p className="text-xs text-white/50 truncate">{mix.artists}</p>
                <p className="text-xs text-white/30">{mix.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Home section */}
        <div className="px-4">
          <h2 className="text-xl font-bold text-white mb-4">Home</h2>
        </div>
      </div>
    </div>
  )
}
