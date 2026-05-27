import { storefrontProducts } from '@/features/storefront/storefront-data'
import { ProductListingClient } from './product-listing.client'

export async function ProductListingServer() {
  return <ProductListingClient products={storefrontProducts.slice(0, 30)} />
}
