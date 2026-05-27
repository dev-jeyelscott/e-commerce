'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { UserButton, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { clerkRoutes } from '@/lib/clerk'

export function NavbarClient() {
  const { isLoaded, isSignedIn } = useAuth()

  return (
    <header className="navbar" aria-label="Storefront navigation">
      <div className="navbar__brand">
        <Link href={clerkRoutes.home}>ShopHub</Link>
      </div>

      <NavigationMenu viewport={false} className="navbar__center">
        <NavigationMenuList className="navbar__menu-list">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={clerkRoutes.products}>Products</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={clerkRoutes.categories}>Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="navbar__actions">
        {!isLoaded ? <div className="h-7 w-28 rounded-md bg-muted" aria-hidden="true" /> : null}

        {isLoaded && !isSignedIn ? (
          <>
            <Button asChild type="button" variant="ghost">
              <Link href={clerkRoutes.signIn}>Login</Link>
            </Button>
            <Button asChild type="button">
              <Link href={clerkRoutes.signUp}>Signup</Link>
            </Button>
          </>
        ) : null}

        {isLoaded && isSignedIn ? (
          <>
            <Button asChild type="button" variant="ghost" size="icon" aria-label="Cart">
              <Link href={clerkRoutes.cart}>
                <ShoppingCart />
              </Link>
            </Button>
            <UserButton />
          </>
        ) : null}
      </div>
    </header>
  )
}
