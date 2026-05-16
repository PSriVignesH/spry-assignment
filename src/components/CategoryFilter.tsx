import { useQueryStates } from 'nuqs'
import { useCategoriesQuery } from '@/query/get-categories'
import { productSearchParams } from '@/lib/searchParams'
import { Input } from './ui/input'
import CategorySkeleton from './skeletons/CategorySkeleton'

const CategoryFilter = () => {
  const [{ category }, setParams] = useQueryStates(productSearchParams)
  const { data: categoriesData, isLoading } = useCategoriesQuery()

  const handleCategoryChange = (slug: string, checked: boolean) => {
    setParams({
      category: checked ? slug : '',
      page: 1,
    })
  }

  if (isLoading) {
    return (
      <div>
        <CategorySkeleton />
      </div>
    )
  }

  if (!categoriesData?.length) {
    return <p className="text-sm text-muted-foreground">No categories found.</p>
  }

  return (
    <div className="flex max-h-[250px] flex-col gap-2 overflow-y-auto">
      {categoriesData.map((item) => {
        const id = `category-${item.slug}`
        return (
          <label
            key={item.slug}
            htmlFor={id}
            className="flex cursor-pointer items-center gap-3"
          >
            <Input
              id={id}
              type="checkbox"
              className="h-5 w-5 shrink-0 cursor-pointer"
              checked={category === item.slug}
              onChange={(e) => handleCategoryChange(item.slug, e.target.checked)}
            />
            <span className="text-sm text-gray-400">{item.name}</span>
          </label>
        )
      })}
    </div>
  )
}

export default CategoryFilter
