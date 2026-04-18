export interface Track {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  duration: number
}

export interface Playlist {
  id: string
  title: string
  description: string
  cover: string
  tracks: Track[]
  artists: string[]
}

export type Screen = "home" | "search" | "explore" | "library" | "profile"

export interface DailyMix {
  id: string
  number: number
  artists: string[]
  description: string
  cover: string
  genre: string
}
