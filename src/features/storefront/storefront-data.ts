export type StorefrontProduct = {
  id: number
  name: string
  category: string
  price: number
  discountedPrice?: number
  promo?: string
  image: string
}

export type StorefrontCategory = {
  id: number
  title: string
  productCount: number
  image: string
  tone: string
}

const productImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
]

const productNames = [
  ['Everyday Carry Tote', 'Bags'],
  ['Wireless Studio Headphones', 'Audio'],
  ['Runner Knit Sneakers', 'Footwear'],
  ['Smart Fitness Watch', 'Wearables'],
  ['Compact Travel Camera', 'Cameras'],
  ['Slim Work Laptop', 'Tech'],
  ['Ceramic Desk Lamp', 'Home'],
  ['Premium Cotton Hoodie', 'Apparel'],
  ['Insulated Steel Bottle', 'Lifestyle'],
  ['Minimal Wall Clock', 'Home'],
  ['Leather Card Wallet', 'Accessories'],
  ['Portable Bluetooth Speaker', 'Audio'],
  ['Ergonomic Task Chair', 'Office'],
  ['Glass Pour Over Kit', 'Kitchen'],
  ['Canvas Weekend Duffel', 'Bags'],
  ['Trail Running Cap', 'Apparel'],
  ['Matte Phone Case', 'Tech'],
  ['Organic Linen Shirt', 'Apparel'],
  ['Noise Cancelling Earbuds', 'Audio'],
  ['Adjustable Laptop Stand', 'Office'],
  ['Aroma Diffuser Set', 'Home'],
  ['Rechargeable Reading Light', 'Home'],
  ['Daily Planner Journal', 'Stationery'],
  ['Performance Yoga Mat', 'Fitness'],
  ['Stainless Lunch Box', 'Kitchen'],
  ['Classic Denim Jacket', 'Apparel'],
  ['Smart Home Hub', 'Tech'],
  ['Waterproof Hiking Pack', 'Outdoor'],
  ['Travel Cable Organizer', 'Accessories'],
  ['Modern Table Mirror', 'Home'],
] as const

export const storefrontProducts: StorefrontProduct[] = productNames.map(
  ([name, category], index) => {
    const basePrice = 490 + index * 135
    const hasDiscount = index % 3 === 0 || index % 5 === 0

    return {
      id: index + 1,
      name,
      category,
      price: basePrice,
      discountedPrice: hasDiscount ? basePrice - 120 - (index % 4) * 25 : undefined,
      promo: index % 6 === 0 ? 'Weekend deal' : index % 4 === 0 ? 'New markdown' : undefined,
      image: productImages[index % productImages.length],
    }
  },
)

export const storefrontCategories: StorefrontCategory[] = [
  'Audio',
  'Footwear',
  'Wearables',
  'Cameras',
  'Tech',
  'Home',
  'Apparel',
  'Lifestyle',
  'Accessories',
  'Office',
  'Kitchen',
  'Bags',
  'Fitness',
  'Outdoor',
  'Stationery',
  'Beauty',
  'Gaming',
  'Travel',
  'Pets',
  'Kids',
].map((title, index) => ({
  id: index + 1,
  title,
  productCount: 32 + index * 7,
  image: productImages[(index + 2) % productImages.length],
  tone:
    index % 4 === 0
      ? 'from-primary/30 to-chart-1/30'
      : index % 4 === 1
        ? 'from-chart-2/25 to-secondary'
        : index % 4 === 2
          ? 'from-accent to-chart-3/20'
          : 'from-muted to-primary/20',
}))

export const heroSlides = [
  {
    title: 'Fresh Finds',
    subtitle: 'Curated products from independent merchants.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Home Essentials',
    subtitle: 'Practical upgrades for rooms, desks, and routines.',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Tech Staples',
    subtitle: 'Daily gear selected for work, travel, and play.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80',
  },
]

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
