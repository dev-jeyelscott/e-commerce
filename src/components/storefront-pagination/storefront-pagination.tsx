import { Suspense } from 'react'

import { StorefrontPaginationLoading } from './storefront-pagination.loading'
import { StorefrontPaginationServer } from './storefront-pagination.server'

export function StorefrontPagination() {
  return (
    <Suspense fallback={<StorefrontPaginationLoading />}>
      <StorefrontPaginationServer />
    </Suspense>
  )
}
