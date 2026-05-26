# Implement Clerk Authentication

Clerk is already installed and api keys are already in `.env.local`. I want you to implement a clerk login and signup functionality. add this on the right side of the navbar.

## Implementation

- add clerkMiddleware to the app
- wrap the root layout with `ClerkProvider`
- create a login and signup pages using clerk components
- define public routes using existing sign-in and sign-up env vars. Protect everything else by default.
- Add clerk's built-in `UserButton` to the right side of the navbar for the profile setting and logout.
- Keep Clerk's default user menu and profile flow intact. Do not rebuild or heavily customize Clerk internals.
- Use existing Clerk env vars. Do not rename or invent new ones.

## Checks when done

- signup is working properly without issue
- login is working properly without issue
- logged in user can logout properly without issue
- logging out will clear the session