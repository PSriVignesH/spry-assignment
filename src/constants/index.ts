import type { Rating } from "@/types";

export const RATINGS: Rating[] = [
  {
    id: 1,
    name: "4.0 & Up ⭐️",
    rating: 4,
  },
  {
    id: 2,
    name: "3.0 & Up ⭐️",
    rating: 3,
  },
]

 
export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
]


export const PRODUCTS_PAGE_SIZE = 12
export const BASE = 'https://dummyjson.com'