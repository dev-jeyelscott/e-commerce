import { Suspense } from 'react'

import { SignUpPageLoading } from './sign-up-page.loading'
import { SignUpPageServer } from './sign-up-page.server'

export function SignUpPage() {
  return (
    <Suspense fallback={<SignUpPageLoading />}>
      <SignUpPageServer />
    </Suspense>
  )
}
