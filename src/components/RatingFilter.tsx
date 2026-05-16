import { useQueryStates } from 'nuqs'
import { RATINGS } from '@/constants'
import { productSearchParams } from '@/lib/searchParams'
import { Input } from './ui/input'

const RatingFilter = () => {
  const [{ rating }, setParams] = useQueryStates(productSearchParams)

  const handleRatingChange = (value: number, checked: boolean) => {
    setParams({
      rating: checked ? value : 0,
      page: 1,
    })
  }

  return (
    <div className="mb-5 flex flex-col gap-2">
      {RATINGS.map((item) => {
        const id = `rating-${item.id}`
        return (
          <label
            key={item.id}
            htmlFor={id}
            className="flex cursor-pointer items-center gap-3"
          >
            <Input
              id={id}
              type="checkbox"
              className="h-5 w-5 shrink-0 cursor-pointer"
              checked={rating === item.rating}
              onChange={(e) => handleRatingChange(item.rating, e.target.checked)}
            />
            <span className="text-sm text-gray-400">{item.name}</span>
          </label>
        )
      })}
    </div>
  )
}

export default RatingFilter
