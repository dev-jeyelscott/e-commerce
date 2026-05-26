const publishableKey = import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local')
}

export const clerkRoutes = {
  home: '/',
  products: '/products',
  categories: '/categories',
  signIn: '/sign-in',
  signUp: '/sign-up',
} as const

export const clerkOptions = {
  publishableKey,
  signInUrl: clerkRoutes.signIn,
  signUpUrl: clerkRoutes.signUp,
  afterSignOutUrl: clerkRoutes.signIn,
}
