'use client'

import { SignIn } from '@clerk/nextjs'

import { clerkRoutes } from '@/lib/clerk'

export function SignInPageClient() {
  return (
    <section className="auth-page">
      <SignIn
        path={clerkRoutes.signIn}
        routing="path"
        signUpUrl={clerkRoutes.signUp}
        fallbackRedirectUrl={clerkRoutes.home}
      />
    </section>
  )
}
