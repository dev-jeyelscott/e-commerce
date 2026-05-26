# AGENTS.md

## Purpose

This file defines the operating rules for AI coding agents working on this multi-tenant e-commerce application.

Use this document as the primary execution guide when planning, editing, reviewing, or generating code. The project is spec-driven: implementation must follow the context files in this repository and must not invent undefined product behavior.

---

## Project Summary

Build a production-ready multi-tenant e-commerce platform where:

- Customers can browse, search, filter, favorite, cart, checkout, pay, and track orders.
- Merchants can manage their own isolated store workspace, products, brands, categories, tags, inventory, discounts, orders, invoices, reports, media, settings, and staff.
- Merchant owners can create or invite staff users with roles such as Admin, Moderator, Editor, Inventory Staff, Order Staff, and Viewer.
- Super Admins can approve/suspend merchants, manage users, monitor platform activity, and configure global settings.
- The application is organized as three major systems:
  - Customer Storefront
  - Merchant Dashboard
  - Super Admin Platform

---

## Source of Truth Documents

Before making changes, read the relevant context files.

| File | Purpose |
|---|---|
| `project-overview.md` | Product definition, goals, user flows, scope, success criteria, and definition of done. |
| `features-and-modules.md` | Complete module and feature list. |
| `database-design.md` | Database schema, tenant isolation rules, critical data relationships, and build phases. |
| `tech-stack.md` | Recommended framework, libraries, infrastructure, and module-to-tech mapping. |
| `ai-workflow-rules.md` | Agent workflow, scoping rules, missing requirement handling, protected files, and verification rules. |
| `progress-tracker.md` | Current phase, goal, completed work, next work, open questions, architecture decisions, and session notes. |

When files disagree, follow this priority:

1. `project-overview.md`
2. `database-design.md`
3. `features-and-modules.md`
4. `tech-stack.md`
5. `ai-workflow-rules.md`
6. `progress-tracker.md`

If a conflict affects product behavior, database design, permissions, or tenant isolation, stop and record it as an open question in `progress-tracker.md` before implementing.

---

## Required Agent Behavior

### Approach

Work incrementally using a spec-driven workflow.

Do not infer large behavior from names, UI assumptions, or common e-commerce patterns unless the behavior is already defined in the context files.

Every implementation unit must be:

- Small
- Verifiable
- Scoped to one feature boundary
- Consistent with the current database design
- Reflected in the relevant documentation when it changes architecture, scope, storage, or behavior

---

## Scoping Rules

Work on one feature unit at a time.

Good feature unit examples:

- Add merchant brand CRUD schema and queries.
- Implement category creation form.
- Add product variant table definitions.
- Implement order status update permission check.
- Add inventory stock movement logging.

Bad feature unit examples:

- Build the full merchant dashboard.
- Implement products, inventory, discounts, and orders together.
- Add checkout, payments, invoices, and notifications in one pass.
- Change schema, UI, jobs, and webhooks in one unverified step.

Do not combine unrelated system boundaries in a single change.

---

## When to Split Work

Split the task if it combines any of the following:

- UI changes and background job changes
- Multiple unrelated API routes
- Multiple unrelated modules
- Storefront and merchant dashboard logic
- Merchant dashboard and super admin logic
- Database schema changes and large UI implementation
- Payment logic and order-management UI
- Behavior not clearly defined in the context files

If the change cannot be verified end to end quickly, the scope is too broad.

---

## Missing Requirements Policy

Do not invent behavior that is missing from the specs.

When a requirement is ambiguous:

1. Add the ambiguity to `progress-tracker.md` under `Open Questions`.
2. Do not implement the ambiguous behavior yet.
3. Implement only the clearly defined foundation around it if safe.

When a requirement is missing but needed:

1. Add it to `progress-tracker.md`.
2. Document why it blocks or affects implementation.
3. Continue only with non-blocked work.

Examples of requirements that must not be invented:

- Exact merchant approval workflow
- Commission or marketplace fee logic
- Shipping carrier integration
- Coupon stacking rules
- Product review/rating system
- Loyalty/reward system
- AI product description generation
- Advanced recommendation engine
- Multi-currency behavior

These are out of scope for the initial version unless the context files are updated.

---

## Protected Files and Components

Do not modify these unless explicitly instructed:

- Generated UI library components
- Third-party library internals
- Lockfiles unless dependency changes require it
- Generated migration files unless fixing a known migration issue
- Generated client files
- Build output directories
- External package code inside `node_modules`

For shadcn/ui:

- Prefer composing components from `components/ui`.
- Do not rewrite generated primitives unless the user explicitly requests a design-system change.
- Put feature-specific UI in feature folders or shared app components.

---

## Recommended Tech Stack

Use the documented project stack unless explicitly changed:

```txt
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
PostgreSQL
Drizzle ORM
Auth.js / NextAuth
Stripe
PayMongo or Xendit
UploadThing or Cloudinary
ExcelJS
React PDF or Puppeteer
Resend
Inngest or Trigger.dev
Upstash Redis
Meilisearch, optional later
Sentry
PostHog
Vercel
Neon / Supabase / Railway PostgreSQL
```

### Stack Rules

- Use TypeScript for all application code.
- Use PostgreSQL as the source of truth for relational data.
- Use Drizzle ORM for schema and database access.
- Use Zod for server-side validation.
- Use Auth.js / NextAuth or the agreed auth layer for authentication.
- Use custom RBAC for merchant staff and platform roles.
- Use PostgreSQL full-text search for MVP search.
- Add Meilisearch only when the catalog requires advanced search behavior.
- Use background jobs for long-running work such as imports, exports, notifications, invoice generation, and payment webhook follow-ups.
- Never use frontend-only payment success as the final payment source of truth. Use provider webhooks.

---

## Suggested Folder Structure

Prefer this structure unless the existing codebase already has a stronger established convention:

```txt
src/
  app/
    (storefront)/
    (merchant)/
    (admin)/
    api/
  components/
    ui/
    shared/
  features/
    auth/
    merchants/
    staff/
    products/
    brands/
    categories/
    tags/
    discounts/
    inventory/
    cart/
    checkout/
    payments/
    orders/
    invoices/
    reports/
    notifications/
    media/
    search/
    settings/
  db/
    schema/
    migrations/
    index.ts
  lib/
    auth/
    payments/
    email/
    storage/
    validations/
    permissions/
  jobs/
  types/
```

### Folder Rules

- Keep feature-specific logic inside `src/features/<feature>`.
- Keep shared primitives in `src/components/shared`.
- Keep generated or reusable shadcn/ui components in `src/components/ui`.
- Keep database schema definitions grouped by domain under `src/db/schema`.
- Keep permission logic centralized under `src/lib/permissions`.
- Keep provider integrations under `src/lib/<provider-domain>`.
- Keep background jobs under `src/jobs`.

---

## Architecture Boundaries

### 1. Customer Storefront

Responsible for:

- Product browsing
- Search, filter, and sort
- Product details
- Wishlist/favorites
- Cart
- Checkout
- Payments
- Order history
- Order tracking
- Customer invoices

Storefront code must not expose merchant-only or admin-only data.

### 2. Merchant Dashboard

Responsible for:

- Merchant onboarding
- Store profile and settings
- Staff management
- Product, brand, category, and tag management
- Inventory and stock movements
- Discounts
- Orders
- Invoices
- Reports
- Media management
- Notifications

Merchant dashboard data must always be scoped by the active `merchant_id`.

### 3. Super Admin Platform

Responsible for:

- Merchant approval
- Merchant suspension
- User management
- Platform monitoring
- Failed imports/payments monitoring
- Audit logs
- Platform settings

Super Admin features must use explicit platform-level authorization and must not reuse merchant-level access checks as a substitute.

---

## Multi-Tenancy Rules

Tenant isolation is a critical foundation.

### Required Rule

Every merchant-owned record must be scoped by `merchant_id`.

This includes:

- Products
- Brands
- Categories
- Tags
- Product variants
- Inventory items
- Stock movements
- Discounts
- Orders
- Invoices
- Import/export jobs
- Reports
- Notifications
- Audit logs
- Merchant staff records
- Media assets where applicable

### Query Rule

Every merchant-owned query must include tenant scoping.

Correct:

```ts
where: and(
  eq(products.id, productId),
  eq(products.merchantId, activeMerchantId)
)
```

Incorrect:

```ts
where: eq(products.id, productId)
```

### Mutation Rule

Every create/update/delete operation for merchant-owned data must verify:

1. The authenticated user exists.
2. The user is a member of the target merchant.
3. The user has the required permission.
4. The target record belongs to the active merchant.
5. The mutation writes or preserves the correct `merchant_id`.

### Cross-Tenant Rule

Never allow a merchant user to access another merchant's:

- Product data
- Inventory data
- Order data
- Customer order details
- Reports
- Staff list
- Settings
- Media assets
- Audit logs

---

## Authentication and Authorization Rules

### Roles

The system supports these role categories:

- Customer
- Super Admin
- Merchant Owner
- Merchant Admin
- Moderator
- Editor
- Inventory Staff
- Order Staff
- Viewer

### RBAC Rules

Do not rely on a single `role` field alone for merchant staff authorization.

Use the database-backed RBAC model:

```txt
roles
permissions
role_permissions
merchant_members
```

### Permission Examples

Use granular permissions such as:

```txt
products.create
products.read
products.update
products.delete
inventory.update
orders.update_status
reports.export
merchant_users.manage
settings.update
```

### Authorization Check Pattern

For protected merchant actions:

1. Get current user.
2. Resolve active merchant context.
3. Verify membership in `merchant_members`.
4. Verify role and permission through `roles`, `permissions`, and `role_permissions`.
5. Execute the action with `merchant_id` scoping.
6. Write an audit log for important actions.

---

## Database Design Rules

Follow the schema rules in `database-design.md`.

### Core Rules

1. Every merchant-owned record must include `merchant_id`.
2. Users are separate from merchant staff membership.
3. Roles and permissions are configurable.
4. Products and inventory are separate.
5. Product variants are the inventory anchor.
6. Even simple products should have one default variant.
7. Multi-merchant checkout must use `order_groups`.
8. Merchant-specific orders must use `orders`.
9. Payments belong to the parent `order_group`.
10. Merchant revenue is tracked through `payment_allocations`.
11. Invoices are generated per merchant order.
12. Historical order and invoice data must use snapshots.

---

## Product and Catalog Rules

### Product Structure

Products are merchant-owned catalog records.

Products may have:

- Brand
- Multiple categories
- Multiple tags
- Multiple images
- Variants
- SEO metadata
- Status
- Visibility flags
- Feature/trending/bestseller metadata

### Variant Rule

Inventory attaches to variants, not directly to the product.

Required flow:

```txt
products
  -> product_variants
    -> inventory_items
```

Even a product with no visible options must have a default variant.

### Slug and SKU Rules

Use merchant-scoped uniqueness:

```txt
UNIQUE(merchant_id, slug)
UNIQUE(merchant_id, sku)
```

For variants:

```txt
UNIQUE(merchant_id, sku)
```

---

## Inventory Rules

Inventory accuracy is critical.

### Inventory Anchor

Use `inventory_items` as the current inventory state and `stock_movements` as immutable history.

### Available Quantity

Use:

```txt
available_quantity = quantity_on_hand - quantity_reserved
```

### Stock Reservation Rule

Do not reserve stock when an item is added to cart.

Use this lifecycle:

```txt
cart item added              = no reservation
checkout started             = reserve stock
payment failed / expired     = release reservation
payment successful           = convert reserved stock to sold stock
```

### Transaction Rule

Use PostgreSQL transactions for inventory-sensitive operations:

- Checkout stock reservation
- Payment success stock deduction
- Payment failure reservation release
- Order cancellation stock restoration
- Manual stock adjustment
- Return/refund stock restoration where applicable

### Stock Movement Rule

Every inventory change must create an immutable `stock_movements` record with:

- Previous quantity on hand
- New quantity on hand
- Previous reserved quantity
- New reserved quantity
- Movement type
- Reference type and ID when applicable
- User who caused the change when applicable
- Reason when applicable

Never generate inventory reports from ad hoc product quantity changes. Use `stock_movements`.

---

## Cart and Checkout Rules

### Cart Rules

- Cart is database-backed.
- Cart items must include `merchant_id`, `product_id`, and `variant_id`.
- Cart validation must re-check product availability, stock, and discount validity.
- Adding to cart does not reserve stock.

### Checkout Rules

Checkout must:

1. Use selected cart items.
2. Revalidate product status and visibility.
3. Revalidate variant status.
4. Revalidate stock availability.
5. Revalidate discounts.
6. Recalculate subtotal, discount, tax, shipping, and final total server-side.
7. Create checkout session records and item snapshots.
8. Reserve stock only during checkout.
9. Create order records only after valid checkout/payment flow.

---

## Order Rules

A single checkout may contain products from multiple merchants.

Use this structure:

```txt
order_groups = customer checkout container
orders       = merchant-specific order
order_items  = products under each merchant order
```

### Order Data Rules

- `order_groups` represent the customer's full checkout.
- `orders` represent merchant-specific order slices.
- `order_items` store product snapshots at purchase time.
- Order numbers must be unique per merchant.
- Order status changes must be recorded in `order_status_history`.
- Merchant-visible orders must always be scoped by `merchant_id`.

### Order Statuses

Supported merchant order statuses:

```txt
pending
confirmed
processing
packed
shipped
delivered
cancelled
refunded
```

Do not add new statuses unless the specs are updated.

---

## Payment Rules

Payment behavior must be provider-confirmed.

### Supported Payment Methods

- Stripe
- Debit card
- Credit card
- GCash
- Maya

### Provider Rules

- Use Stripe for card payments.
- Use PayMongo or Xendit for Philippine payment methods such as GCash and Maya.
- Store payment records in PostgreSQL.
- Store webhook events for idempotency and auditability.
- Never trust frontend payment completion alone.
- Webhooks must update payment status.
- Webhooks must be idempotent.
- Payment events must be uniquely constrained by provider and event ID.

### Payment Allocation Rule

Because checkout can span multiple merchants:

```txt
payment
  -> payment_allocations
    -> merchant orders
```

Use `payment_allocations` to track merchant revenue.

---

## Invoice Rules

- Generate one invoice per merchant order.
- Invoice numbers must be unique per merchant.
- Invoice records must use customer, merchant, and billing snapshots.
- Generated invoice PDFs should be stored in the configured file storage system.
- Do not let historical invoices change when live customer, merchant, or product records change.

---

## Discount Rules

Supported discount types:

```txt
fixed_amount
percentage
```

Supported discount targets:

```txt
store
product
category
brand
```

Discounts must support:

- Start date
- End date
- Status
- Active/scheduled/expired/disabled lifecycle
- Usage tracking
- Optional stackability only if explicitly implemented by spec

Validation requirements:

- Percentage discounts must be within a valid percentage range.
- Fixed amount discounts must be positive.
- End date must be after start date.
- Discounts must be revalidated at checkout.

Use background jobs or scheduled tasks for activation and expiration when implemented.

---

## Import and Export Rules

### Import

Excel imports are supported for:

- Products
- Inventory
- Categories
- Brands
- Tags

Import flow should include:

1. Upload file.
2. Create `import_jobs`.
3. Parse rows.
4. Validate rows with Zod or equivalent validation.
5. Store row-level results in `import_job_rows`.
6. Preview errors when applicable.
7. Process valid rows.
8. Report successful and failed rows.

Large imports must run in background jobs.

### Export

Exports are supported for:

- Products
- Inventory
- Orders
- Reports

Use `export_jobs` for long-running exports and store generated files through the media/file storage system.

---

## Media Rules

Use file storage for uploaded files. Do not store raw files directly in PostgreSQL.

Media assets may include:

- Product images
- Brand logos
- Category images
- Merchant logos
- Merchant banners
- Invoice PDFs
- Import files
- Export files

Store metadata in `media_assets`.

Include `merchant_id` where the asset belongs to a merchant.

---

## SEO and Search Rules

### SEO

Use Next.js metadata capabilities for storefront SEO.

Supported SEO records include:

- Meta title
- Meta description
- Slug
- OpenGraph image
- Structured data
- Sitemap generation
- Robots configuration

### Search

For MVP:

- Use PostgreSQL full-text search.
- Support keyword search, filters, sorting, and relevance.

Use Meilisearch later only when requirements demand:

- Typo tolerance
- Synonyms
- Instant search
- Better relevance tuning
- Large catalog search performance

---

## Reporting and Analytics Rules

Reports should be based on immutable operational records:

```txt
orders
order_items
payments
refunds
stock_movements
discount_usages
```

Do not calculate historical reports from mutable live product or inventory fields alone.

Merchant reports must always be scoped by `merchant_id`.

Supported reports include:

- Sales report
- Revenue report
- Orders report
- Inventory report
- Product report
- Discount report
- Customer report

---

## Notification Rules

Notifications may be sent through:

- Email
- In-app notification
- Push notification, optional later

Use background jobs for notification delivery.

Examples:

- Signup success
- Order confirmation
- Payment success
- Order status update
- Refund notification
- New merchant order
- Low stock alert
- Discount expiry
- Failed payment alert
- Import completed

Store notification records in PostgreSQL so users can view in-app notifications.

---

## Audit Log Rules

Write audit logs for important staff, merchant, and admin actions.

Examples:

- Product created
- Product updated
- Product deleted
- Inventory adjusted
- Stock reserved
- Stock restored
- Discount disabled
- Order status updated
- Invoice generated
- Merchant suspended
- Staff invited
- Staff role changed
- Settings updated

Audit logs should include:

- `merchant_id` when applicable
- Actor user ID
- Action
- Entity type
- Entity ID
- Old values when useful
- New values when useful
- IP address/user agent when available

---

## Coding Standards

### TypeScript

- Prefer explicit types at module boundaries.
- Avoid `any` unless unavoidable and justified.
- Keep domain types close to their feature modules.
- Use shared types only when used across multiple features.

### Validation

Use Zod or equivalent validation for:

- Form inputs
- Route handler payloads
- Server action payloads
- Import rows
- Settings objects
- Payment webhook payload normalization
- Discount rules
- Checkout data

### Database Access

- Use Drizzle ORM for schema and queries.
- Prefer transactions for multi-step writes.
- Use database constraints for integrity.
- Use indexes for tenant-scoped and high-read queries.
- Avoid N+1 queries in dashboards, reports, and listing pages.

### Server-Side Rules

- Sensitive calculations must run server-side.
- Price, discount, tax, shipping, inventory, and payment state must not rely on client input.
- Server actions and route handlers must enforce auth, authorization, validation, and tenant scoping.

### UI Rules

- Use Tailwind CSS for styling.
- Use shadcn/ui for reusable primitives.
- Keep pages thin and move feature logic into feature modules.
- Merchant dashboard tables should support search/filter/sort where useful.
- Use accessible form labels, errors, and disabled/loading states.

---

## Security Rules

- Enforce authentication on protected routes.
- Enforce authorization on protected actions.
- Enforce tenant scoping on all merchant-owned data.
- Never expose another merchant's data.
- Never expose sensitive tokens or secrets to the client.
- Use environment variables for secrets.
- Validate all server-side input.
- Use rate limiting for sensitive auth flows when implemented.
- Store password hashes securely using bcrypt or argon2 if using credential login.
- Treat payment webhooks as security-sensitive endpoints.
- Verify webhook signatures.
- Make webhook handling idempotent.

---

## Build Order

Follow the suggested build order unless project priorities are explicitly changed.

### Phase 1 — Foundation

```txt
users
user_identities
merchants
merchant_settings
roles
permissions
role_permissions
merchant_members
audit_logs
```

### Phase 2 — Catalog

```txt
brands
categories
tags
products
product_categories
product_tags
product_options
product_option_values
product_variants
product_variant_option_values
product_media
media_assets
seo_metadata
```

### Phase 3 — Inventory and Discounts

```txt
inventory_items
stock_movements
discounts
discount_targets
discount_usages
```

### Phase 4 — Shopping

```txt
wishlists
wishlist_items
carts
cart_items
checkout_sessions
checkout_session_items
```

### Phase 5 — Orders and Payments

```txt
order_groups
orders
order_items
order_status_history
payments
payment_allocations
payment_events
refunds
```

### Phase 6 — Invoices, Reports, Notifications, Import/Export

```txt
invoices
invoice_items
merchant_daily_metrics
product_daily_metrics
notifications
notification_deliveries
notification_preferences
import_jobs
import_job_rows
export_jobs
```

---

## Documentation Sync Rules

Update the relevant context file whenever implementation changes:

- System architecture or boundaries
- Storage model decisions
- Code conventions or standards
- Feature scope
- Build phase status
- Open questions
- Architecture decisions
- Session notes

### Always Update `progress-tracker.md` After Meaningful Changes

Update:

- `Current Phase`
- `Current Goal`
- `Completed`
- `In Progress`
- `Next Up`
- `Open Questions`
- `Architecture Decisions`
- `Session Notes`

Do not leave `progress-tracker.md` stale after implementation work.

---

## Verification Rules

Before moving to the next unit:

1. The current unit works end to end within its defined scope.
2. Relevant docs are updated.
3. `progress-tracker.md` reflects the completed work.
4. `npm run build` passes.

When available, also run:

```txt
npm run lint
npm run test
npm run typecheck
```

Do not claim verification passed unless the command was actually run.

If a command fails:

1. Report the failure.
2. Fix it if the failure is inside the current scope.
3. If it is outside the current scope, document it in `progress-tracker.md`.

---

## Definition of Done

A feature unit is done when:

- It matches the relevant spec.
- It is tenant-scoped where required.
- It enforces authorization.
- It validates server-side input.
- It handles expected error states.
- It updates relevant database records safely.
- It writes audit logs where required.
- It has no obvious cross-tenant data leak.
- It does not introduce unrelated behavior.
- It updates docs when scope, architecture, or behavior changes.
- It passes the required verification commands.

The full project is done when:

- Customer auth, browsing, search/filter/sort, cart, favorites, checkout, payment, order history, and order tracking work.
- Merchant store management, staff management, product/catalog management, inventory, discounts, order management, invoices, import/export, and reports work.
- Merchant staff permissions work.
- Super Admin merchant approval/suspension, monitoring, user management, and platform settings work.
- Payment webhooks correctly update status.
- Tenant data isolation is validated.
- RBAC is enforced.
- Reports export successfully.
- Invoices generate correctly.
- Notifications are sent successfully.
- Inventory updates correctly.
- Checkout totals are recalculated accurately.
- Discounts apply correctly.
- Order lifecycle is stable.
- Major bugs are resolved.
- The application is production deployable.

---

## Agent Response Rules

When reporting work:

- State what was changed.
- State what files were modified.
- State what verification commands were run.
- State any commands that failed.
- State any open questions added to `progress-tracker.md`.
- Do not say a task is complete if verification was skipped or failed.
- Do not hide assumptions.
- Do not continue into a new unit without finishing the current unit.

---

## Hard No Rules

Do not:

- Bypass tenant scoping.
- Bypass RBAC.
- Trust frontend payment success.
- Reserve stock in cart.
- Modify generated UI primitives without instruction.
- Add out-of-scope features without updating specs.
- Create cross-module implementations in one large step.
- Change database relationships casually.
- Generate reports from mutable live product fields alone.
- Skip `progress-tracker.md` updates after implementation changes.
- Claim tests/build passed without running them.
