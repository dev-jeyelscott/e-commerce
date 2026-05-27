import { cartProducts } from '@/features/cart/cart-data'
import { CheckoutLayoutClient } from './checkout-layout.client'

export async function CheckoutLayoutServer() {
  return <CheckoutLayoutClient cartProducts={cartProducts.filter((item) => item.selected).slice(0, 8)} />
}
