import { Suspense } from 'react'

import { CartSummaryLoading } from './cart-summary.loading'
import { CartSummaryServer } from './cart-summary.server'

type CartSummaryProps = {
  title: string
  itemCount: number
  actualTotal: number
  discountedTotal: number
  shipping?: number
  tax?: number
  actionLabel: string
  actionTo?: string
}

export function CartSummary(props: CartSummaryProps) {
  return (
    <Suspense fallback={<CartSummaryLoading />}>
      <CartSummaryServer {...props} />
    </Suspense>
  )
}
