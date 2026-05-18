import { create } from 'zustand'

interface AppStore {
  // Define aquí tu estado global
  user: { id: string; name: string } | null
  setUser: (user: { id: string; name: string } | null) => void
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
