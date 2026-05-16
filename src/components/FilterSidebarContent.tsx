import { useQueryStates } from 'nuqs'
import CategoryFilter from './CategoryFilter'
import RatingFilter from './RatingFilter'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { productSearchParams } from '@/lib/searchParams'

const FilterSidebarContent = () => {
  const [{ category, sort, rating }, setParams] = useQueryStates(productSearchParams)

  const hasActiveFilters = Boolean(category) || Boolean(sort) || rating > 0

  const handleReset = () => {
    setParams({
      category: '',
      sort: '',
      rating: 0,
      page: 1,
    })
  }

  return (
    <div className='p-6 lg:p-0'>
      <div className="flex flex-col gap-1 pb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <p className="text-[11px] font-medium text-gray-500 uppercase">
          Refine Collection
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-tighter text-black uppercase">
            Category
          </h3>
          <CategoryFilter />
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-tighter text-black uppercase">
            Rating
          </h3>
          <RatingFilter />
        </div>
      </div>
      <Separator className="my-5"/>
      <Button
        type="button"
        className="cursor-pointer"
        variant="outline"
        disabled={!hasActiveFilters}
        onClick={handleReset}
      >
        Reset All Filters
      </Button>
    </div>
  )
}

export default FilterSidebarContent
