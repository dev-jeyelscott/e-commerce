import {
  formatCurrency,
  storefrontProducts,
  type StorefrontProduct,
} from '@/features/storefront/storefront-data'

export type CartProduct = StorefrontProduct & {
  merchant: string
  variant: string
  quantity: number
  selected: boolean
}

const merchants = [
  'Northline Goods',
  'Metro Supply Co.',
  'Harbor Home',
  'Trail & Table',
  'Studio Market',
]

const variants = [
  'Black / Standard',
  'Natural / Medium',
  'Slate / Large',
  'White / Standard',
  'Olive / Compact',
]

export const cartProducts: CartProduct[] = storefrontProducts.map((product, index) => ({
  ...product,
  merchant: merchants[index % merchants.length],
  variant: variants[index % variants.length],
  quantity: (index % 4) + 1,
  selected: index % 3 !== 1,
}))

export function getUnitPrice(product: CartProduct) {
  return product.discountedPrice ?? product.price
}

export function calculateCartTotals(items: CartProduct[]) {
  const actualTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const discountedTotal = items.reduce(
    (total, item) => total + getUnitPrice(item) * item.quantity,
    0,
  )

  return {
    actualTotal,
    discountedTotal,
    discountTotal: actualTotal - discountedTotal,
    formattedActualTotal: formatCurrency(actualTotal),
    formattedDiscountedTotal: formatCurrency(discountedTotal),
  }
}
