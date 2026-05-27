import { CartSummaryClient } from './cart-summary.client'

type CartSummaryServerProps = {
  title: string
  itemCount: number
  actualTotal: number
  discountedTotal: number
  shipping?: number
  tax?: number
  actionLabel: string
  actionTo?: string
}

export async function CartSummaryServer(props: CartSummaryServerProps) {
  return <CartSummaryClient {...props} />
}
