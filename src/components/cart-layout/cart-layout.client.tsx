'use client'

import { CartProductRowClient } from '@/components/cart-product-row/cart-product-row.client'
import { CartSummaryClient } from '@/components/cart-summary/cart-summary.client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { calculateCartTotals, type CartProduct } from '@/features/cart/cart-data'
import { clerkRoutes } from '@/lib/clerk'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

type CartLayoutClientProps = {
  cartProducts: CartProduct[]
}

const initialVisibleCount = 20

export function CartLayoutClient({ cartProducts }: CartLayoutClientProps) {
  const [items, setItems] = useState(cartProducts)
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)
  const [deletePromptId, setDeletePromptId] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current

    if (!sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisibleCount((current) => Math.min(current + 10, cartProducts.length))
        }
      },
      { rootMargin: '240px' },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [cartProducts.length])

  const visibleItems = items.slice(0, visibleCount)
  const selectedItems = items.filter((item) => item.selected)
  const selectedQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0)
  const selectedTotals = useMemo(() => calculateCartTotals(selectedItems), [selectedItems])

  function updateQuantity(itemId: number, quantity: number) {
    setItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    )
  }

  function removeItem(itemId: number) {
    setItems((current) => current.filter((item) => item.id !== itemId))
    setDeletePromptId(null)
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit">
              {items.length} cart products
            </Badge>
            <div>
              <h1 className="font-heading text-4xl font-semibold">Cart</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Review selected products, quantities, discounts, and checkout totals.
              </p>
            </div>
          </div>
          <Button asChild type="button" variant="outline">
            <Link href={clerkRoutes.products}>
              <ShoppingBag />
              Continue shopping
            </Link>
          </Button>
        </div>

        <div className="space-y-3" aria-label="Cart products">
          {visibleItems.map((item) => (
            <CartProductRowClient
              key={item.id}
              item={item}
              quantity={item.quantity}
              checked={item.selected}
              showCheckbox
              showDelete
              deletePromptOpen={deletePromptId === item.id}
              onCheckedChange={(checked) =>
                setItems((current) =>
                  current.map((product) =>
                    product.id === item.id ? { ...product, selected: checked } : product,
                  ),
                )
              }
              onDecrease={() => {
                if (item.quantity <= 1) {
                  setDeletePromptId(item.id)
                  return
                }

                updateQuantity(item.id, item.quantity - 1)
              }}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              onDelete={() => removeItem(item.id)}
              onDeletePromptChange={(open) => setDeletePromptId(open ? item.id : null)}
            />
          ))}
        </div>

        {visibleCount < items.length ? (
          <div ref={sentinelRef} className="grid h-16 place-items-center text-sm text-muted-foreground">
            Loading more cart products
          </div>
        ) : (
          <div ref={sentinelRef} className="h-1" aria-hidden="true" />
        )}
      </section>

      <aside className="lg:pt-29">
        <CartSummaryClient
          title="Cart summary"
          itemCount={selectedQuantity}
          actualTotal={selectedTotals.actualTotal}
          discountedTotal={selectedTotals.discountedTotal}
          actionLabel="Checkout"
          actionTo={clerkRoutes.checkout}
        />
      </aside>
    </div>
  )
}
