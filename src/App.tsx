import './App.css'
import { Show, UserButton, useAuth } from '@clerk/react'
import { Button } from '@/components/ui/button'
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
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

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
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()

  if (!isLoaded) {
    return (
      <div className="auth-status" role="status" aria-live="polite">
        Loading account...
      </div>
    )
  }

  if (!isSignedIn) {
    const nextPath = `${location.pathname}${location.search}${location.hash}`

    return (
      <Navigate
        to={`${clerkRoutes.signIn}?redirect_url=${encodeURIComponent(nextPath)}`}
        replace
      />
    )
  }

  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={`${clerkRoutes.signIn}/*`} element={<SignInPage />} />
        <Route path={`${clerkRoutes.signUp}/*`} element={<SignUpPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={clerkRoutes.home} element={<HomePage />} />
          <Route path={clerkRoutes.products} element={<ProductsPage />} />
          <Route path={clerkRoutes.categories} element={<CategoriesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={clerkRoutes.home} replace />} />
    </Routes>
  )
}

export default App
