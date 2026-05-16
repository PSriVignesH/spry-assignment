import type { FavouritesState } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'



function normalizeFavorites(value: unknown): number[] {
  if (!Array.isArray(value)) return []
  return value.filter((id): id is number => typeof id === 'number')
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: number) => {
        const current = get().favorites
        set({
          favorites: current.includes(id)
            ? current.filter((favId) => favId !== id)
            : [...current, id],
        })
      },
      isFavorite: (id: number) => get().favorites.includes(id),
    }),
    {
      name: 'luxe-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persisted) => {
        if (!persisted || typeof persisted !== 'object') {
          return { favorites: [] }
        }
        const state = persisted as { favorites?: unknown }
        return { favorites: normalizeFavorites(state.favorites) }
      },
    }
  )
)
