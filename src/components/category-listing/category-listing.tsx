import { Suspense } from 'react'

import { CategoryListingLoading } from './category-listing.loading'
import { CategoryListingServer } from './category-listing.server'

export function CategoryListing() {
  return (
    <Suspense fallback={<CategoryListingLoading />}>
      <CategoryListingServer />
    </Suspense>
  )
}
