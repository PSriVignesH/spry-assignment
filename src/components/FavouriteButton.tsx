import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavouritesStore } from '@/store/useFavourites'

export function FavouriteButton() {
  const count = useFavouritesStore((s) => s.favorites.length)

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 cursor-pointer rounded-full"
        aria-label={`Favourites${count > 0 ? `, ${count} items` : ''}`}
      >
        <Heart
          size={16}
          className={count > 0 ? 'fill-red-500 stroke-red-500' : ''}
        />
      </Button>

      {count > 0 && (
        <span className="pointer-events-none absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-background bg-red-500 px-1 text-[10px] font-semibold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}
