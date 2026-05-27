import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Show, UserButton } from '@clerk/react'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clerkRoutes } from '@/lib/clerk'

export default function Navbar() {
  return (
    <header className="navbar" aria-label="Storefront navigation">
      <div className="navbar__brand">
        <Link to={clerkRoutes.home}>ShopHub</Link>
      </div>

      <NavigationMenu viewport={false} className="navbar__center">
        <NavigationMenuList className="navbar__menu-list">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={clerkRoutes.products}>Products</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to={clerkRoutes.categories}>Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="navbar__actions">

        <Show when="signed-out">
          <Button asChild type="button" variant="ghost">
            <Link to={clerkRoutes.signIn}>Login</Link>
          </Button>
          <Button asChild type="button">
            <Link to={clerkRoutes.signUp}>Signup</Link>
          </Button>
        </Show>
        
        <Show when="signed-in">
          
          <Button asChild type="button" variant="ghost" size="icon" aria-label="Cart">
            <Link to={clerkRoutes.cart}>
              <ShoppingCart />
            </Link>
          </Button>
          <UserButton />
        </Show>
      </div>
    </header>
  )
}
