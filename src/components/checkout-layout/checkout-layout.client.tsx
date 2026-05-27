'use client'

import { CartProductRowClient } from '@/components/cart-product-row/cart-product-row.client'
import { CartSummaryClient } from '@/components/cart-summary/cart-summary.client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { calculateCartTotals, type CartProduct } from '@/features/cart/cart-data'
import { CreditCard, Landmark, Smartphone, TicketPercent, WalletCards } from 'lucide-react'
import { useMemo, useState } from 'react'

type CheckoutLayoutClientProps = {
  cartProducts: CartProduct[]
}

const paymentOptions = [
  {
    id: 'card',
    label: 'Card payment',
    detail: 'Debit or credit card',
    icon: CreditCard,
  },
  {
    id: 'gcash',
    label: 'GCash',
    detail: 'Mobile wallet checkout',
    icon: Smartphone,
  },
  {
    id: 'maya',
    label: 'Maya',
    detail: 'Wallet or card payment',
    icon: WalletCards,
  },
  {
    id: 'bank',
    label: 'Bank transfer',
    detail: 'Manual transfer review',
    icon: Landmark,
  },
]

export function CheckoutLayoutClient({ cartProducts }: CheckoutLayoutClientProps) {
  const [items, setItems] = useState(cartProducts)
  const totals = useMemo(() => calculateCartTotals(items), [items])
  const itemQuantity = items.reduce((total, item) => total + item.quantity, 0)
  const shipping = 180
  const tax = Math.round(totals.discountedTotal * 0.08)

  function updateQuantity(itemId: number, quantity: number) {
    setItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="space-y-6">
        <div className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            {itemQuantity} checkout items
          </Badge>
          <div>
            <h1 className="font-heading text-4xl font-semibold">Checkout</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Confirm products, payment method, voucher, and order total.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="border-b pb-4">
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {items.map((item) => (
              <CartProductRowClient
                key={item.id}
                item={item}
                quantity={item.quantity}
                onDecrease={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b pb-4">
            <CardTitle>Payment option</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            <RadioGroup defaultValue="card" className="grid gap-3 sm:grid-cols-2">
              {paymentOptions.map((option) => {
                const Icon = option.icon

                return (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border bg-background p-3 transition-colors has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                  >
                    <RadioGroupItem id={option.id} value={option.id} />
                    <span className="grid size-9 place-items-center rounded-md bg-muted text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{option.label}</span>
                      <span className="block text-xs text-muted-foreground">{option.detail}</span>
                    </span>
                  </Label>
                )
              })}
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="voucher">Voucher</Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <TicketPercent className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="voucher" placeholder="Enter voucher code" className="pl-9" />
                </div>
                <Button type="button" variant="outline">
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <aside className="lg:pt-29">
        <CartSummaryClient
          title="Checkout summary"
          itemCount={itemQuantity}
          actualTotal={totals.actualTotal}
          discountedTotal={totals.discountedTotal}
          shipping={shipping}
          tax={tax}
          actionLabel="Place order"
        />
      </aside>
    </div>
  )
}
