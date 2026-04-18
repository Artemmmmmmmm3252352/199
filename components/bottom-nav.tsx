"use client"

import { Home, Search, Library, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: "home" | "search" | "library" | "profile"
  onTabChange: (tab: "home" | "search" | "library" | "profile") => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "search" as const, icon: Search, label: "Search" },
    { id: "library" as const, icon: Library, label: "Library" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-xl border-t border-border/50">
      <div className="flex items-center justify-around h-full px-6 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
