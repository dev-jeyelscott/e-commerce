import { Suspense } from 'react'

import type { StorefrontCategory } from '@/features/storefront/storefront-data'
import { CategoryTileLoading } from './category-tile.loading'
import { CategoryTileServer } from './category-tile.server'

type CategoryTileProps = {
  category: StorefrontCategory
}

export function CategoryTile(props: CategoryTileProps) {
  return (
    <Suspense fallback={<CategoryTileLoading />}>
      <CategoryTileServer {...props} />
    </Suspense>
  )
}
