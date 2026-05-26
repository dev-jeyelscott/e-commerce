import "./App.css"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

function App() {
  return (
    <div className="app-shell">
      <header className="navbar" aria-label="Storefront navigation">
        <div className="navbar__brand">
          <span>ShopHub</span>
        </div>

        <NavigationMenu viewport={false} className="navbar__center">
          <NavigationMenuList className="navbar__menu-list">
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Products</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Categories</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="navbar__actions">
          <Button type="button" variant="ghost">
            Login
          </Button>
          <Button type="button">Signup</Button>
        </div>
      </header>
    </div>
  )
}

export default App
