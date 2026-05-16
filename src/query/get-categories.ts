
import type { GetCategoriesData } from '@/types'
import { useQuery } from '@tanstack/react-query'
 
export function useCategoriesQuery() {
  return useQuery<GetCategoriesData>({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('https://dummyjson.com/products/categories').then((r) => r.json()),
    staleTime: 1000 * 60 * 60 * 24, 
    gcTime: 1000 * 60 * 60 * 25, 
  })
}
 
