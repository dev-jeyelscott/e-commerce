import { Suspense } from 'react'

import { CheckoutLayoutLoading } from './checkout-layout.loading'
import { CheckoutLayoutServer } from './checkout-layout.server'

export function CheckoutLayout() {
  return (
    <Suspense fallback={<CheckoutLayoutLoading />}>
      <CheckoutLayoutServer />
    </Suspense>
  )
}
