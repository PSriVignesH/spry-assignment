import { Skeleton } from '@/components/ui/skeleton'

const ProductCardSkeleton = () => {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-border bg-card p-2 sm:p-2.5">
      <Skeleton className="aspect-square w-full rounded-2xl" />

      <div className="flex flex-col gap-2 px-0.5 pb-1 pt-1">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-10" />
        </div>

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-7 w-24 rounded-md" />
        </div>
      </div>
    </article>
  )
}

export default ProductCardSkeleton
