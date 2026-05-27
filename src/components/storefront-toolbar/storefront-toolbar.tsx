import { Suspense } from 'react'

import { StorefrontToolbarLoading } from './storefront-toolbar.loading'
import { StorefrontToolbarServer } from './storefront-toolbar.server'

type StorefrontToolbarProps = {
  placeholder: string
  filters: string[]
  sortOptions: string[]
}

export function StorefrontToolbar(props: StorefrontToolbarProps) {
  return (
    <Suspense fallback={<StorefrontToolbarLoading />}>
      <StorefrontToolbarServer {...props} />
    </Suspense>
  )
}
