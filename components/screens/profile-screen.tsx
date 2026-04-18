"use client"

import { Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut, Moon, Smartphone } from "lucide-react"
import Image from "next/image"

const menuItems = [
  { icon: Bell, label: "Notifications", value: "On" },
  { icon: Moon, label: "Dark Mode", value: "On" },
  { icon: Smartphone, label: "Audio Quality", value: "High" },
  { icon: Shield, label: "Privacy", value: "" },
  { icon: HelpCircle, label: "Help & Support", value: "" },
]

export function ProfileScreen() {
  return (
    <div className="min-h-screen bg-black px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <button className="p-2 text-[#666]">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="flex items-center gap-4 bg-[#1a1a1a] rounded-2xl p-4 mb-6 border border-[#333]/30">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#C8E45C]/30">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
            alt="Profile"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">Sarah Johnson</h2>
          <p className="text-[#888]">@sarahj</p>
          <p className="text-sm text-[#C8E45C] mt-1">Premium Member</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#1a1a1a] rounded-xl p-4 text-center border border-[#333]/30">
          <p className="text-2xl font-bold text-[#C8E45C]">234</p>
          <p className="text-xs text-[#888]">Playlists</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-4 text-center border border-[#333]/30">
          <p className="text-2xl font-bold text-[#C8E45C]">1.2k</p>
          <p className="text-xs text-[#888]">Following</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-4 text-center border border-[#333]/30">
          <p className="text-2xl font-bold text-[#C8E45C]">856</p>
          <p className="text-xs text-[#888]">Followers</p>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#333]/30">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 p-4 text-left ${
              index !== menuItems.length - 1 ? "border-b border-[#333]/50" : ""
            }`}
          >
            <item.icon className="w-5 h-5 text-[#666]" />
            <span className="flex-1 text-white">{item.label}</span>
            {item.value && (
              <span className="text-sm text-[#888]">{item.value}</span>
            )}
            <ChevronRight className="w-4 h-4 text-[#666]" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full flex items-center gap-4 bg-[#1a1a1a] rounded-2xl p-4 mt-4 text-red-500 border border-[#333]/30">
        <LogOut className="w-5 h-5" />
        <span>Log Out</span>
      </button>

      {/* App Version */}
      <p className="text-center text-xs text-[#666] mt-6">
        Soundtrack v1.0.0
      </p>
    </div>
  )
}
