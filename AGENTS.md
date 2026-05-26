# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Summary

This repository is the starting point for a multi-tenant e-commerce platform. The intended product has three major areas:

- Customer storefront
- Merchant dashboard
- Super admin platform

The current codebase is a React + TypeScript + Vite app. The broader target architecture is documented in `context/` and may evolve toward a full-stack Next.js/PostgreSQL application. Do not assume the current starter app represents the final architecture.

## Required Context

Before making product or architecture changes, read the relevant files in this order:

1. `context/ai-workflow-rules.md`
2. `context/project-overview.md`
3. `context/features-and-modules.md`
4. `context/database-design.md`
5. `context/tech-stack.md`
6. `context/progress-tracker.md`

These files are the source of truth for scope, system behavior, database design, build order, and current progress.

## Current Commands

Use these npm scripts from the repository root:

```sh
npm run dev
npm run build
npm run lint
npm run preview
```

Run `npm run build` before considering an implementation unit complete. Run `npm run lint` when changing TypeScript, React, styling, or configuration.

## Implementation Rules

- Work in small, verifiable units.
- No spaghetti code.
- Keep every component minimal and short.
- Create a new file for new component.
- Don't create your own css, use tailwind classes.
- Implement only behavior defined in the context files.
- If requirements are unclear, update `context/progress-tracker.md` with an open question before building speculative behavior.
- Keep context docs in sync when implementation changes architecture, feature scope, data model, or conventions.
- Do not mix unrelated system boundaries in one change, such as storefront UI, merchant workflows, and admin governance.
- Prefer established project patterns over new abstractions.
- Do not modify generated UI library components or third-party internals unless explicitly requested.

## Domain Rules

- Every merchant-owned record must be scoped by `merchant_id` or the equivalent application-level `merchantId`.
- Tenant isolation is a hard requirement. Never expose merchant data across tenants.
- Roles and permissions must support customer, merchant staff, merchant owner/admin, and super admin flows.
- Inventory must be separate from product records and anchored to product variants.
- Carts do not reserve stock. Stock is reserved when checkout starts and released on payment failure or expiration.
- Order data, invoice data, product snapshots, addresses, customer snapshots, and merchant snapshots must preserve historical accuracy.
- Multi-merchant checkout should use a parent order group with merchant-specific child orders.
- Payment success must be verified server-side through provider confirmation or webhooks, never only from client state.

## Frontend Guidance

- Build the actual usable app surface, not a marketing landing page, unless the requested unit is explicitly marketing content.
- Keep operational surfaces dense, clear, and task-oriented for merchant and admin workflows.
- Use responsive layouts that prevent text overlap and layout shift.
- Prefer accessible form controls, semantic HTML, keyboard-friendly interactions, and clear focus states.
- Reuse Tailwind and existing CSS conventions already present in `src/index.css` and `src/App.css`.

## File Organization

Current app files live under `src/`. The recommended long-term feature structure is documented in `context/tech-stack.md`.

When adding substantial application code, prefer feature-oriented organization that can grow toward:

```txt
src/
  components/
  features/
  lib/
  types/
```

If the project is migrated to Next.js, follow the recommended structure in `context/tech-stack.md` and update this file.

## Verification

Before finishing a coding task:

1. Confirm the current unit works within its defined scope.
2. Run `npm run build`.
3. Run `npm run lint` when applicable.
4. Update `context/progress-tracker.md` for meaningful implementation progress.
5. Note any skipped verification or unresolved questions in the final response.

## Git And Safety

- Do not revert user changes unless explicitly asked.
- Check worktree status before and after edits.
- Keep changes scoped to the requested task.
- Avoid destructive commands unless the user explicitly requested them.
