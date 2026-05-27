'use client'

import { SignUp } from '@clerk/nextjs'

import { clerkRoutes } from '@/lib/clerk'

export function SignUpPageClient() {
  return (
    <section className="auth-page">
      <SignUp
        path={clerkRoutes.signUp}
        routing="path"
        signInUrl={clerkRoutes.signIn}
        fallbackRedirectUrl={clerkRoutes.home}
      />
    </section>
  )
}
