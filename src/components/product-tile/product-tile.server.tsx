import type { StorefrontProduct } from '@/features/storefront/storefront-data'
import { ProductTileClient } from './product-tile.client'

type ProductTileServerProps = {
  product: StorefrontProduct
}

export async function ProductTileServer({ product }: ProductTileServerProps) {
  return <ProductTileClient product={product} />
}
