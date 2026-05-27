import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ProductTile } from '@/components/storefront/ProductTile'
import {
  heroSlides,
  storefrontProducts,
} from '@/features/storefront/storefront-data'
import { BarChart3, PackageCheck, ShieldCheck, Store } from 'lucide-react'
import { Link } from 'react-router-dom'

const sellerReasons = [
  {
    title: 'Merchant-ready catalog',
    description: 'List products, variants, promos, and stock in one focused workflow.',
    icon: PackageCheck,
  },
  {
    title: 'Built for tenant isolation',
    description: 'Store data stays scoped to each merchant as the platform grows.',
    icon: ShieldCheck,
  },
  {
    title: 'Operational dashboards',
    description: 'Track orders, inventory, and sales from one clear workspace.',
    icon: BarChart3,
  },
  {
    title: 'Room to scale',
    description: 'Start with essentials and expand into imports, reports, and staff roles.',
    icon: Store,
  },
]

export function HomePage() {
  return (
    <div className="w-full space-y-16">
      <section aria-label="Featured categories">
        <Carousel className="mx-auto w-full max-w-7xl" opts={{ loop: true }}>
          <CarouselContent className="-ml-0">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.title} className="pl-0">
                <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/45" />
                  <div className="relative mx-auto max-w-2xl px-6 text-center text-primary-foreground">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
                      Shop by category
                    </p>
                    <h1 className="font-heading text-4xl font-bold leading-tight sm:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85">
                      {slide.subtitle}
                    </p>
                    <Button asChild className="mt-7" size="lg" type="button">
                      <Link to="/products">Shop now</Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/90" />
          <CarouselNext className="right-4 bg-background/90" />
        </Carousel>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-6" aria-labelledby="featured-products">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Featured</p>
            <h2 id="featured-products" className="font-heading text-3xl font-semibold">
              Featured products
            </h2>
          </div>
          <Button asChild type="button" variant="outline">
            <Link to="/products">View all products</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {storefrontProducts.slice(0, 5).map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-6" aria-labelledby="best-sellers">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Popular now</p>
          <h2 id="best-sellers" className="font-heading text-3xl font-semibold">
            Best seller products
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {storefrontProducts.slice(0, 15).map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-12" aria-labelledby="sell-with-us">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase text-primary">For merchants</p>
            <h2 id="sell-with-us" className="font-heading text-3xl font-semibold">
              Start selling with ShopHub
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Bring your catalog into a marketplace experience designed for clear shopping,
              merchant operations, and future multi-tenant growth.
            </p>
            <Button type="button" size="lg">
              Start selling
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {sellerReasons.map((reason) => {
              const Icon = reason.icon
              return (
                <div key={reason.title} className="rounded-lg border bg-background p-5">
                  <Icon className="mb-4 size-6 text-primary" />
                  <h3 className="font-heading text-base font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
