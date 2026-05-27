# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Choose the next implementation unit from `context/feature-spec/`.

## Completed

- Design system foundation from `context/feature-spec/01-design-system.md`:
  installed the specified UI component set, added `lucide-react`, created
  `src/lib/utils.ts` with `cn()`, and added missing Form/Data Table wrappers.
- Shadcn preset from `context/feature-spec/02-shadcn-preset.md`: applied
  `b6q0jtj81w`, updated the shadcn style to Radix Mira, base color to Mauve,
  Lucide icons, Raleway body font, Montserrat heading font, preset theme/chart
  tokens, radius, menu settings, and regenerated preset components.
- Frontend navbar from `context/feature-spec/03-frontend-navbar.md`:
  replaced the starter app shell with a static storefront navbar using the
  shadcn navigation menu and button components, with ShopHub on the left,
  Products and Categories centered, and Login and Signup on the right.
- Clerk authentication from `context/feature-spec/04-clerk-authentication.md`:
  added app-wide Clerk provider wiring in the Vite entrypoint, enabled
  `NEXT_PUBLIC_` env loading in Vite, added protected/public routing with
  dedicated sign-in and sign-up pages using Clerk components, redirected
  signed-out users to sign-in by default, and replaced navbar auth buttons with
  signed-out Login/Signup links plus Clerk's built-in `UserButton` for signed
  in users.
- Storefront pages from `context/feature-spec/05-storefront-pages.md`:
  added Home, Products, Categories, Login, and Signup routes using
  `react-router-dom`, centered the placeholder page names, centered Clerk's
  sign-in/sign-up UI, and changed storefront navigation to client-side links.
- Clerk users to app users table from
  `context/feature-spec/06-users-with-clerk-auth.md`: installed Drizzle ORM,
  Postgres, Drizzle Kit, and Clerk backend webhook support; added the
  PostgreSQL `users` schema and generated migration; added a signed Clerk
  `user.created` webhook sync that upserts Clerk user data into the app users
  table; documented required database/webhook environment variables; and made
  Home, Products, and Categories publicly accessible.
- Docker PostgreSQL with Drizzle from
  `context/feature-spec/07-docker-postgres.md`: added Docker Compose for local
  PostgreSQL using the configured database URL credentials, renamed the initial
  generated migration to `0000_create_users.sql`, taught Drizzle Kit to load
  Vite-style env files, started the Docker PostgreSQL service, and applied the
  migration successfully.
- Clerk user database sync fix: investigated missing local `users` records
  after Clerk signup, added server-side `.env.local` loading for database and
  Clerk server code, added an authenticated `/api/users/sync` fallback that
  verifies the signed-in Clerk session, fetches the Clerk user server-side, and
  upserts the app `users` table, and wired the React shell to trigger the sync
  once per signed-in user session.
- Ngrok Clerk user sync fix: replaced lower-level manual Clerk token
  verification in `/api/users/sync` with Clerk Backend SDK request
  authentication so signed-in sessions coming through the ngrok host are
  authenticated from the actual request before syncing the user.
- Clerk local clock skew fix: allowed a 60-second clock skew while
  authenticating `/api/users/sync` session tokens because the dev server clock
  can lag Clerk token `nbf` timestamps by a few seconds when signing up through
  ngrok.
- Storefront page layouts from
  `context/feature-spec/08-storefront-page-layouts.md`: replaced the Home,
  Products, and Categories placeholders with dummy-data storefront layouts;
  added reusable product tiles, category tiles, storefront toolbar controls,
  pagination, and shared storefront dummy data; implemented the home carousel,
  featured products, best sellers, and merchant selling section; implemented
  product search/filter/sort controls with 30 product tiles; and implemented a
  visually distinct categories page with 20 category tiles.
- TypeScript node build typing fix: added the DOM lib to `tsconfig.node.json`
  because the existing Vite/API request adapters use standard Fetch API types
  such as `Request` and `HeadersInit`.
- Clerk user sync upsert fix: changed the `/api/users/sync` database upsert
  to avoid passing a raw JavaScript `Date` inside a Drizzle SQL fragment,
  which caused the Postgres driver to reject the verified-email update during
  login/signup redirects.
- Cart and checkout page layouts from
  `context/feature-spec/09-cart-and-checkout-layouts.md`: added UI-only
  dummy-data Cart and Checkout routes, reusable cart product row and summary
  components, cart navigation, selected item checkboxes, initial 20-row cart
  rendering with scroll-based loading for the remaining dummy products,
  quantity controls with zero-quantity delete confirmation, price/discount
  totals, checkout product review, payment method radio options, voucher input,
  and place-order summary.

## In Progress

- None.

## Next Up

- Choose the next implementation unit from `context/feature-spec/`.

## Open Questions

- `context/feature-spec/04-clerk-authentication.md` says to use existing
  Clerk sign-in and sign-up env vars, but `.env.local` currently only contains
  `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. The app currently
  uses `/sign-in` and `/sign-up` as the route defaults instead of reading
  missing URL env vars.

## Architecture Decisions

- Use shadcn/ui Radix Nova with Tailwind CSS v4 for the initial UI component
  foundation because it matches the documented recommended stack.
- Keep generated UI files under `src/components/ui/` unedited after CLI
  installation; project-level compatibility fixes belong in configuration or
  separate local wrappers.
- Use the `b6q0jtj81w` shadcn preset as the active UI preset. It sets
  `components.json` to Radix Mira with Mauve base color, Lucide icons, default
  menu color, and subtle menu accent.
- Keep Clerk integrated at the React entrypoint and route layer for the current
  Vite app. The repository is not yet running a Next.js App Router runtime, so
  `src/main.tsx` and React Router are the active equivalents to a Next root
  layout and protected route setup.

## Session Notes

- `npm run lint` and `npm run build` pass for the design-system foundation.
- `cn()` was runtime-checked with conflicting Tailwind classes and correctly
  returned the later class.
- Applied `npx shadcn@latest apply --preset b6q0jtj81w --yes`.
- `react-day-picker` is pinned to `9.14.0` because the generated Calendar
  component uses the v9 classNames API.
- `npm run lint` and `npm run build` pass after the preset application.
- `npm.cmd run lint` and `npm.cmd run build` pass after the navbar
  implementation. `npm.cmd` is required in this environment because PowerShell
  execution policy blocks `npm.ps1`.
- Installed `@clerk/react` and `react-router-dom` to match the current Vite
  React app structure while keeping Clerk's built-in auth and user menu flows.
- `npm.cmd run lint` and `npm.cmd run build` pass after the storefront pages
  implementation.
- `npm.cmd run db:generate` created the initial Drizzle migration for the
  `users` table.
- `npm.cmd run lint` and `npm.cmd run build` pass after the Clerk users to app
  users table implementation.
- Real Clerk signup persistence requires `DATABASE_URL` and
  `CLERK_WEBHOOK_SIGNING_SECRET` to be configured before running
  `npm.cmd run db:migrate` and receiving Clerk webhook events.
- `docker compose up -d postgres` starts a healthy local PostgreSQL container
  mapped to host port `5432`.
- `npm.cmd run db:migrate` applies the renamed `0000_create_users.sql`
  migration successfully against the Docker PostgreSQL database.
- Verified the app-side Postgres client can connect using the configured
  `DATABASE_URL` and query the `postgres` database.
- `npm.cmd run lint` and `npm.cmd run build` pass after the Docker PostgreSQL
  wiring.
- Missing Clerk signup records were caused by relying only on Clerk webhooks
  for local persistence. Local Clerk webhooks require a public tunnel and a
  configured `CLERK_WEBHOOK_SIGNING_SECRET`; the app now also syncs the current
  signed-in Clerk user through a local authenticated API endpoint.
- `npm.cmd run lint` and `npm.cmd run build` pass after the Clerk user sync
  fallback fix.
- `npm.cmd run lint` and `npm.cmd run build` pass after switching
  `/api/users/sync` to Clerk request authentication for ngrok signups.
- `npm.cmd run lint` and `npm.cmd run build` pass after adding the
  `/api/users/sync` Clerk token clock-skew allowance.
- `npm.cmd run lint` and `npm.cmd run build` pass after the storefront page
  layouts implementation. Build emits the existing Vite chunk-size warning for
  a bundle over 500 kB.
- Reproduced the Clerk user sync upsert locally against the existing
  PostgreSQL `users` row and confirmed it now returns `ok`.
- Verified an unverified Clerk email sync no longer clears an existing
  `email_verified_at` timestamp.
- `npm.cmd run lint` and `npm.cmd run build` pass after the Clerk user sync
  upsert fix. Build still emits the existing Vite chunk-size warning for a
  bundle over 500 kB.
- `npm.cmd run lint` and `npm.cmd run build` pass after the cart and checkout
  page layouts implementation. Build still emits the existing Vite chunk-size
  warning for a bundle over 500 kB.
- Vite dev server is reachable at `http://localhost:5173/cart` and
  `http://localhost:5173/checkout`.
