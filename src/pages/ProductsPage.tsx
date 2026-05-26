import { ProductTile } from '@/components/storefront/ProductTile'
import { StorefrontPagination } from '@/components/storefront/StorefrontPagination'
import { StorefrontToolbar } from '@/components/storefront/StorefrontToolbar'
import { Badge } from '@/components/ui/badge'
import { storefrontProducts } from '@/features/storefront/storefront-data'

export function ProductsPage() {
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

      <StorefrontToolbar
        placeholder="Search products"
        filters={['In stock', 'Discounted', 'Featured', 'New arrivals', 'Best sellers']}
        sortOptions={['Recently added', 'Price ascending', 'Price descending', 'Alphabetical A-Z']}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Product results">
        {storefrontProducts.slice(0, 30).map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </section>

      <StorefrontPagination />
    </div>
  )
}
