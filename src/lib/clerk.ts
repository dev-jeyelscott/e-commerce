export const clerkRoutes = {
  home: '/',
  products: '/products',
  categories: '/categories',
  cart: '/cart',
  checkout: '/checkout',
  signIn: '/sign-in',
  signUp: '/sign-up',
} as const

export const clerkOptions = {
  signInUrl: clerkRoutes.signIn,
  signUpUrl: clerkRoutes.signUp,
  afterSignOutUrl: clerkRoutes.signIn,
}
