'use client'

import { ProductTileClient } from '@/components/product-tile/product-tile.client'
import { StorefrontPaginationClient } from '@/components/storefront-pagination/storefront-pagination.client'
import { StorefrontToolbarClient } from '@/components/storefront-toolbar/storefront-toolbar.client'
import { Badge } from '@/components/ui/badge'
import type { StorefrontProduct } from '@/features/storefront/storefront-data'

type ProductListingClientProps = {
  products: StorefrontProduct[]
}

export function ProductListingClient({ products }: ProductListingClientProps) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          30 products
        </Badge>
        <div className="grid gap-3 md:grid-cols-[minmax(0,0.7fr)_minmax(16rem,0.3fr)] md:items-end">
          <div>
            <h1 className="font-heading text-4xl font-semibold">Products</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Browse a dummy catalog with search, filters, sorting, product promos,
              sale pricing, and add-to-cart actions.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
            Product inventory shown here is static storefront sample data only.
          </div>
        </div>
      </section>

      <StorefrontToolbarClient
        placeholder="Search products"
        filters={['In stock', 'Discounted', 'Featured', 'New arrivals', 'Best sellers']}
        sortOptions={['Recently added', 'Price ascending', 'Price descending', 'Alphabetical A-Z']}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Product results">
        {products.map((product) => (
          <ProductTileClient key={product.id} product={product} />
        ))}
      </section>

      <StorefrontPaginationClient />
    </div>
  )
}
