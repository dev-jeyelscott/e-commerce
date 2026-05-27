import { StorefrontToolbarClient } from './storefront-toolbar.client'

type StorefrontToolbarServerProps = {
  placeholder: string
  filters: string[]
  sortOptions: string[]
}

export async function StorefrontToolbarServer(props: StorefrontToolbarServerProps) {
  return <StorefrontToolbarClient {...props} />
}
