import { heroSlides, storefrontProducts } from '@/features/storefront/storefront-data'
import { HomeStorefrontContentClient } from './home-storefront-content.client'

export async function HomeStorefrontContentServer() {
  return <HomeStorefrontContentClient heroSlides={heroSlides} products={storefrontProducts} />
}
