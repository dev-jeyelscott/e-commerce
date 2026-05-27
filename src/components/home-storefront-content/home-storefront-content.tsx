import { Suspense } from 'react'

import { HomeStorefrontContentLoading } from './home-storefront-content.loading'
import { HomeStorefrontContentServer } from './home-storefront-content.server'

export function HomeStorefrontContent() {
  return (
    <Suspense fallback={<HomeStorefrontContentLoading />}>
      <HomeStorefrontContentServer />
    </Suspense>
  )
}
