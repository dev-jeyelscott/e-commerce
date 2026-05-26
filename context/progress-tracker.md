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
