import type { FC } from 'react'
import { Star } from 'lucide-react'
import type { ProductCardProps } from '@/types'
import { Button } from '@/components/ui/button'
import HeartButton from './HeartButton'
import { formatCategory, priceFormatter } from '@/lib/utils'



const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-border bg-card p-2 text-card-foreground shadow-sm transition-shadow hover:shadow-md sm:p-2.5">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted/30">
        <img
          loading="lazy"
          src={product.thumbnail}
          alt={product.title}
          width={280}
          height={280}
          className="h-full w-full object-cover"
        />
        <HeartButton productId={product.id} productTitle={product.title}/>
      </div>

      <div className="flex flex-col gap-2 px-0.5 pb-1 pt-1">
        <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs">
          <span className="truncate font-medium uppercase tracking-wide text-muted-foreground">
            {formatCategory(product.category)}
          </span>
          <span className="flex shrink-0 items-center gap-0.5 font-medium tabular-nums text-foreground">
            <Star
              className="size-3 fill-amber-400 text-amber-400 sm:size-3.5"
              aria-hidden
            />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.title}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold tabular-nums">
            {priceFormatter.format(product.price)}
          </span>
          <Button
            className='cursor-pointer'
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
