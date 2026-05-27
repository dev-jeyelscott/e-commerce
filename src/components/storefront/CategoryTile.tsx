import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { StorefrontCategory } from '@/features/storefront/storefront-data'
import { ArrowUpRight } from 'lucide-react'

type CategoryTileProps = {
  category: StorefrontCategory
}

export function CategoryTile({ category }: CategoryTileProps) {
  return (
    <Card className="group relative min-h-48 overflow-hidden py-0">
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${category.tone}`} />
      <div className="absolute inset-0 bg-background/55" />

      <div className="relative flex h-full min-h-48 flex-col justify-between p-4">
        <Badge variant="secondary" className="w-fit">
          {category.productCount} products
        </Badge>
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-semibold leading-tight">
            {category.title}
          </h3>
          <Button className="w-fit" size="sm" type="button" variant="secondary">
            Explore
            <ArrowUpRight />
          </Button>
        </div>
      </div>
    </Card>
  )
}
