import Sort from './Sort'
import {  useProductsQuery } from '@/query/get-products'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './skeletons/ProductCardSkeleton'
import { PRODUCTS_PAGE_SIZE } from '@/constants'

const ProductsList = () => {
  const { data, isLoading } = useProductsQuery()

  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="flex items-start md:items-center gap-8 flex-col md:flex-row md:justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold">All Collections</h1>
          <p className="text-gray-400 text-sm">
            Discover 48 premium items curated for you
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium tracking-wider text-gray-400 uppercase">
            Sort
          </p>
          <Sort />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: PRODUCTS_PAGE_SIZE }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data?.products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
    </div>
  )
}

export default ProductsList
