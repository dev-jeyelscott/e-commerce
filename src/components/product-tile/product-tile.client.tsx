'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatCurrency, type StorefrontProduct } from '@/features/storefront/storefront-data'
import { ShoppingCart } from 'lucide-react'

type ProductTileClientProps = {
  product: StorefrontProduct
}

export function ProductTileClient({ product }: ProductTileClientProps) {
  const hasDiscount = typeof product.discountedPrice === 'number'

  return (
    <Card className="gap-3 py-0 transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.promo ? (
          <Badge className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate">
            {product.promo}
          </Badge>
        ) : null}
      </div>

      <CardContent className="space-y-2 px-3">
        <div className="space-y-1">
          <p className="line-clamp-1 text-[0.7rem] font-medium uppercase text-muted-foreground">
            {product.category}
          </p>
          <h3 className="line-clamp-2 min-h-10 font-heading text-sm font-semibold leading-5">
            {product.name}
          </h3>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="font-heading text-base font-semibold text-primary">
                {formatCurrency(product.discountedPrice ?? product.price)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span className="font-heading text-base font-semibold">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-3 pb-3 pt-0">
        <Button className="w-full" size="sm" type="button">
          <ShoppingCart />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
