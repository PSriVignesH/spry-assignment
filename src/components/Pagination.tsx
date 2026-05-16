import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useQueryStates } from 'nuqs'
import { productSearchParams } from '@/lib/searchParams'
import {  useProductsQuery } from '@/query/get-products'
import { PRODUCTS_PAGE_SIZE } from '@/constants'

const ProductsPagination = () => {
  const [{ page }, setParams] = useQueryStates(productSearchParams)
  const { data } = useProductsQuery() 

  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / PRODUCTS_PAGE_SIZE)

  if (totalPages <= 1) return null

  function getPages(): (number | 'ellipsis')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | 'ellipsis')[] = [1]
    if (page > 3) pages.push('ellipsis')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('ellipsis')
    pages.push(totalPages)
    return pages
  }

  return (
    <Pagination className="py-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setParams({ page: page - 1 })}
            aria-disabled={page === 1}
            className={page === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
          />
        </PaginationItem>

        {getPages().map((p, i) =>
          p === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => setParams({ page: p })}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => setParams({ page: page + 1 })}
            aria-disabled={page === totalPages}
            className={page === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ProductsPagination