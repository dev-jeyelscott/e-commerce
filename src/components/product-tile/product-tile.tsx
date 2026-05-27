import { Suspense } from 'react'

import type { StorefrontProduct } from '@/features/storefront/storefront-data'
import { ProductTileLoading } from './product-tile.loading'
import { ProductTileServer } from './product-tile.server'

type ProductTileProps = {
  product: StorefrontProduct
}

export function ProductTile(props: ProductTileProps) {
  return (
    <Suspense fallback={<ProductTileLoading />}>
      <ProductTileServer {...props} />
    </Suspense>
  )
}
