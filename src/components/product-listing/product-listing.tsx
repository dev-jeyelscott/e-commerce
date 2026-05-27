import { Suspense } from 'react'

import { ProductListingLoading } from './product-listing.loading'
import { ProductListingServer } from './product-listing.server'

export function ProductListing() {
  return (
    <Suspense fallback={<ProductListingLoading />}>
      <ProductListingServer />
    </Suspense>
  )
}
