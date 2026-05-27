'use client'

import { CategoryTileClient } from '@/components/category-tile/category-tile.client'
import { StorefrontPaginationClient } from '@/components/storefront-pagination/storefront-pagination.client'
import { StorefrontToolbarClient } from '@/components/storefront-toolbar/storefront-toolbar.client'
import { Badge } from '@/components/ui/badge'
import type { StorefrontCategory } from '@/features/storefront/storefront-data'

type CategoryListingClientProps = {
  categories: StorefrontCategory[]
}

export function CategoryListingClient({ categories }: CategoryListingClientProps) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <Badge className="mb-4 w-fit" variant="secondary">
          20 categories
        </Badge>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(16rem,0.25fr)] lg:items-end">
          <div>
            <h1 className="font-heading text-4xl font-semibold">Categories</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Explore departments by shopping intent, product count, and visual category
              grouping before moving into product discovery.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-xs text-muted-foreground">
            <div className="rounded-md bg-muted p-3">
              <span className="block font-heading text-xl font-semibold text-foreground">4</span>
              per row
            </div>
            <div className="rounded-md bg-muted p-3">
              <span className="block font-heading text-xl font-semibold text-foreground">20</span>
              total
            </div>
          </div>
        </div>
      </section>

      <StorefrontToolbarClient
        placeholder="Search categories"
        filters={['Top departments', 'Seasonal', 'High inventory', 'New collections']}
        sortOptions={['Alphabetical A-Z', 'Alphabetical Z-A', 'Most products', 'Recently added']}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Category results">
        {categories.map((category) => (
          <CategoryTileClient key={category.id} category={category} />
        ))}
      </section>

      <StorefrontPaginationClient />
    </div>
  )
}
