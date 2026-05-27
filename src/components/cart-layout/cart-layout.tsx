import { Suspense } from 'react'

import { CartLayoutLoading } from './cart-layout.loading'
import { CartLayoutServer } from './cart-layout.server'

export function CartLayout() {
  return (
    <Suspense fallback={<CartLayoutLoading />}>
      <CartLayoutServer />
    </Suspense>
  )
}
