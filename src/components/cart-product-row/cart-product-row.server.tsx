import type { CartProduct } from '@/features/cart/cart-data'
import { CartProductRowClient } from './cart-product-row.client'

type CartProductRowServerProps = {
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

export async function CartProductRowServer(props: CartProductRowServerProps) {
  return <CartProductRowClient {...props} />
}
