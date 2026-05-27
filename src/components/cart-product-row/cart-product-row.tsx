import { Suspense } from 'react'

import type { CartProduct } from '@/features/cart/cart-data'
import { CartProductRowLoading } from './cart-product-row.loading'
import { CartProductRowServer } from './cart-product-row.server'

type CartProductRowProps = {
  item: CartProduct
  checked?: boolean
  quantity: number
  showCheckbox?: boolean
  showDelete?: boolean
  deletePromptOpen?: boolean
  onCheckedChange?: (checked: boolean) => void
  onDecrease: () => void
  onIncrease: () => void
  onDelete?: () => void
  onDeletePromptChange?: (open: boolean) => void
}

export function CartProductRow(props: CartProductRowProps) {
  return (
    <Suspense fallback={<CartProductRowLoading />}>
      <CartProductRowServer {...props} />
    </Suspense>
  )
}
