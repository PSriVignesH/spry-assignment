import { parseAsFloat, parseAsInteger, parseAsString } from 'nuqs'
 
export const productSearchParams = {
  category: parseAsString.withDefault(''),
  sort: parseAsString.withDefault(''),     
  rating: parseAsFloat.withDefault(0),     
  page: parseAsInteger.withDefault(1),
}
 