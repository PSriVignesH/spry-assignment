import type { FC } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFavouritesStore } from '@/store/useFavourites'
import { toast } from 'sonner'
import type { HeartButtonProps } from '@/types'



const HeartButton: FC<HeartButtonProps> = ({ productId, productTitle }) => {
  const isFavorited = useFavouritesStore((s) => s.favorites.includes(productId))
  const toggleFavorite = useFavouritesStore((s) => s.toggleFavorite)

  const handleClick = () => {
    toggleFavorite(productId)
    if (isFavorited) {
      toast('Removed from favourites', {
        description: productTitle,
        icon: <Heart className="size-4 fill-neutral-400 stroke-neutral-400" />,
        classNames: {
          description: '!text-black/80',
        },
      })
    } else {
      toast('Added to favourites', {
        description: productTitle,
        icon: <Heart className="size-4 fill-rose-500 stroke-rose-500" />,
        classNames: {
          description: '!text-black/80',
        },
      })
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={isFavorited}
      className="absolute right-2 top-2 z-10 size-auto min-h-0 min-w-0 rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-transparent hover:opacity-80 cursor-pointer"
      onClick={handleClick}
    >
      <span className="relative block size-7">
        <Heart
          className={cn(
            'relative size-6',
            isFavorited
              ? 'fill-rose-500 stroke-rose-500'
              : 'fill-neutral-500/70 stroke-neutral-500/70'
          )}
          aria-hidden
        />
      </span>
    </Button>
  )
}

export default HeartButton