import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

import { ClerkUserSync } from '@/components/clerk-user-sync/clerk-user-sync'
import { Navbar } from '@/components/navbar/navbar'
import { clerkOptions } from '@/lib/clerk'
import '../index.css'
import '../App.css'

export const metadata: Metadata = {
  title: 'ShopHub',
  description: 'Multi-tenant e-commerce storefront',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ClerkProvider {...clerkOptions}>
      <html lang="en">
        <body>
          <div className="app-shell">
            <ClerkUserSync />
            <Navbar />
            <main className="app-content">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
