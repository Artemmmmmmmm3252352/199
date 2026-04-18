"use client"

import { Home, Search, Compass, Library, User } from "lucide-react"
import type { Screen } from "@/lib/types"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

const navItems: { screen: Screen; icon: typeof Home; label: string }[] = [
  { screen: "home", icon: Home, label: "Home" },
  { screen: "search", icon: Search, label: "Search" },
  { screen: "explore", icon: Compass, label: "Explore" },
  { screen: "library", icon: Library, label: "Library" },
  { screen: "profile", icon: User, label: "Profile" },
]

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="flex items-center justify-around bg-black/95 backdrop-blur-lg border-t border-[#222] py-3 px-4">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen
        return (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              isActive ? "text-[#C8E45C]" : "text-[#666]"
            }`}
          >
            <item.icon
              className={`w-6 h-6 transition-all ${isActive ? "fill-[#C8E45C]/20 stroke-[#C8E45C]" : "stroke-[#666]"}`}
              strokeWidth={isActive ? 2 : 1.5}
            />
          </button>
        )
      })}
    </nav>
  )
}
