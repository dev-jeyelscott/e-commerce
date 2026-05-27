import { storefrontCategories } from '@/features/storefront/storefront-data'
import { CategoryListingClient } from './category-listing.client'

export async function CategoryListingServer() {
  return <CategoryListingClient categories={storefrontCategories.slice(0, 20)} />
}
