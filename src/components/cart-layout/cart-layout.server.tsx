import { cartProducts } from '@/features/cart/cart-data'
import { CartLayoutClient } from './cart-layout.client'

export async function CartLayoutServer() {
  return <CartLayoutClient cartProducts={cartProducts} />
}
