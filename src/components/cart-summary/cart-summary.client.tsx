'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/features/storefront/storefront-data'
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'

type CartSummaryClientProps = {
  title: string
  itemCount: number
  actualTotal: number
  discountedTotal: number
  shipping?: number
  tax?: number
  actionLabel: string
  actionTo?: string
}

export function CartSummaryClient({
  title,
  itemCount,
  actualTotal,
  discountedTotal,
  shipping = 0,
  tax = 0,
  actionLabel,
  actionTo,
}: CartSummaryClientProps) {
  const discountTotal = actualTotal - discountedTotal
  const finalTotal = discountedTotal + shipping + tax
  const action = (
    <>
      {actionLabel}
      <ArrowRight />
    </>
  )

  return (
    <Card className="sticky top-6 gap-0">
      <CardHeader className="border-b pb-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Items</span>
            <span className="font-medium">{itemCount}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Actual total</span>
            <span className="font-medium">{formatCurrency(actualTotal)}</span>
          </div>
          {discountTotal > 0 ? (
            <div className="flex items-center justify-between gap-4 text-primary">
              <span>Discounted total</span>
              <span className="font-semibold">{formatCurrency(discountedTotal)}</span>
            </div>
          ) : null}
          {shipping > 0 ? (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{formatCurrency(shipping)}</span>
            </div>
          ) : null}
          {tax > 0 ? (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Taxes</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
          ) : null}
        </div>

        <div className="rounded-lg bg-muted/60 p-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">Total amount</span>
            <span className="font-heading text-xl font-semibold">{formatCurrency(finalTotal)}</span>
          </div>
        </div>

        <div className="grid gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            Selected items are recalculated before checkout.
          </div>
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            Shipping and tax totals are sample UI values.
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        {actionTo ? (
          <Button asChild type="button" className="w-full" size="lg">
            <Link href={actionTo}>{action}</Link>
          </Button>
        ) : (
          <Button type="button" className="w-full" size="lg">
            {action}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
