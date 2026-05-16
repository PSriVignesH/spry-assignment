import type { ReactNode } from "react";

interface Category {
  slug: string;
  name: string;
  url: string;
}


export interface Rating {
  id: number,
  rating: number,
  name:string
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  category: string
  thumbnail: string
  images: string[]
  availabilityStatus: string
  brand?: string
}
 
export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
 

export interface ProductCardProps{
  product:Product
}

export interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

export interface State {
  hasError: boolean
  error?: Error
}

export interface HeartButtonProps {
  productId: number
  productTitle: string
} 

export interface FavouritesState {
  favorites: number[]
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

export type GetCategoriesData = Category[];