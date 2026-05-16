import { Skeleton } from '../ui/skeleton'

const CategorySkeleton = () => {
  return (
    <div className="flex flex-col gap-2 max-h-[250px]">
      {
        Array.from({ length: 6 }).map((_, index) => (
          <div className="flex items-center gap-3" key={index}>
          <Skeleton className="h-5 w-5 rounded" />

          <Skeleton className="h-4 w-[150px]" />
        </div>
        ))
      }
    </div>
  )
}

export default CategorySkeleton