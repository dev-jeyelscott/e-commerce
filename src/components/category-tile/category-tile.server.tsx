import type { StorefrontCategory } from '@/features/storefront/storefront-data'
import { CategoryTileClient } from './category-tile.client'

type CategoryTileServerProps = {
  category: StorefrontCategory
}

export async function CategoryTileServer({ category }: CategoryTileServerProps) {
  return <CategoryTileClient category={category} />
}
