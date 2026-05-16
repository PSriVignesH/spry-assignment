import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useQueryStates } from 'nuqs'
import { productSearchParams } from '../lib/searchParams'
import type { Product, ProductsResponse } from '@/types'
import { BASE, PRODUCTS_PAGE_SIZE } from '@/constants'



async function fetchProducts(url: string): Promise<ProductsResponse> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export function useProductsQuery() {
  const [{ category, sort, rating, page }] = useQueryStates(productSearchParams)

  const [sortBy, order] = sort ? sort.split('-') : ['', '']

  const isClientPaginated = rating > 0

  let url: string
  if (isClientPaginated) {
    if (category) {
      url = `${BASE}/products/category/${encodeURIComponent(category)}?limit=0`
    } else {
      url = `${BASE}/products?limit=0`
    }
  } else {
    const skip = (page - 1) * PRODUCTS_PAGE_SIZE
    if (category) {
      url = `${BASE}/products/category/${encodeURIComponent(category)}?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}`
    } else {
      const sortPart = sortBy ? `&sortBy=${sortBy}&order=${order}` : ''
      url = `${BASE}/products?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}${sortPart}`
    }
  }

  const query = useQuery<ProductsResponse>({
    queryKey: isClientPaginated
      ? ['products', category, sort, rating]
      : ['products', category, sort, page],
    queryFn: () => fetchProducts(url),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  })

  let products: Product[] = query.data?.products ?? []

  if (rating > 0) {
    products = products.filter((p) => p.rating >= rating)
  }

  if (sortBy && (category || isClientPaginated)) {
    products = [...products].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    )
  }

  const clientTotal = products.length

  if (isClientPaginated) {
    const skip = (page - 1) * PRODUCTS_PAGE_SIZE
    products = products.slice(skip, skip + PRODUCTS_PAGE_SIZE)
  }

  const total = isClientPaginated ? clientTotal : query.data?.total ?? 0

  return {
    ...query,
    data: query.data ? { ...query.data, products, total } : undefined,
  }
}