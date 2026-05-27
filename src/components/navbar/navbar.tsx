import { Suspense } from 'react'

import { NavbarLoading } from './navbar.loading'
import { NavbarServer } from './navbar.server'

export function Navbar() {
  return (
    <Suspense fallback={<NavbarLoading />}>
      <NavbarServer />
    </Suspense>
  )
}
