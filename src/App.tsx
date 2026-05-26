import './App.css'
import { Show, UserButton } from '@clerk/react'
import { Button } from '@/components/ui/button'
import { ClerkUserSync } from '@/components/ClerkUserSync'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { clerkRoutes } from '@/lib/clerk'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { HomePage } from '@/pages/HomePage'
import { ProductsPage } from '@/pages/ProductsPage'
import { SignInPage } from '@/pages/SignInPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'

function Navbar() {
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
          <UserButton />
        </Show>
      </div>
    </header>
  )
}

function AppShell() {
  return (
    <div className="app-shell">
      <ClerkUserSync />
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={`${clerkRoutes.signIn}/*`} element={<SignInPage />} />
        <Route path={`${clerkRoutes.signUp}/*`} element={<SignUpPage />} />
        <Route path={clerkRoutes.home} element={<HomePage />} />
        <Route path={clerkRoutes.products} element={<ProductsPage />} />
        <Route path={clerkRoutes.categories} element={<CategoriesPage />} />
      </Route>

      <Route path="*" element={<Navigate to={clerkRoutes.home} replace />} />
    </Routes>
  )
}

export default App
