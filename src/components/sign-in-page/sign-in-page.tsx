import { Suspense } from 'react'

import { SignInPageLoading } from './sign-in-page.loading'
import { SignInPageServer } from './sign-in-page.server'

export function SignInPage() {
  return (
    <Suspense fallback={<SignInPageLoading />}>
      <SignInPageServer />
    </Suspense>
  )
}
