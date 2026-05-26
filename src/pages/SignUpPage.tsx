import { SignUp } from '@clerk/react'

import { clerkRoutes } from '@/lib/clerk'

export function SignUpPage() {
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
