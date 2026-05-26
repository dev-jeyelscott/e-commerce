import { SignIn } from '@clerk/react'

import { clerkRoutes } from '@/lib/clerk'

export function SignInPage() {
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
