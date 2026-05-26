import './App.css'
import { ClerkUserSync } from '@/components/ClerkUserSync'

import { clerkRoutes } from '@/lib/clerk'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { HomePage } from '@/pages/HomePage'
import { ProductsPage } from '@/pages/ProductsPage'
import { SignInPage } from '@/pages/SignInPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar'



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
