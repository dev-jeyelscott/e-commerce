# Free-Account Tech Stack — Multi-Tenant E-Commerce App

## Goal

Build the multi-tenant e-commerce app using **free accounts only** and avoid hard dependencies on paid plans, paid organization features, paid cloud add-ons, or monthly subscriptions.

This updated stack keeps the project production-shaped while staying realistic for an MVP, portfolio build, or early prototype.

---

## Key Changes From the Previous Stack

| Previous Stack Item | Updated Decision | Reason |
|---|---|---|
| Clerk Organizations | **Removed as a hard dependency** | Merchant/workspace management should be handled in your own database to avoid depending on paid or plan-limited organization features. |
| Clerk Roles/Org Permissions | **Removed as a hard dependency** | Use custom database RBAC instead. |
| Meilisearch Cloud | **Removed** | Use PostgreSQL full-text search first. Self-host Meilisearch locally later if needed. |
| Paid Redis usage | **Avoided as required dependency** | Use database-backed rate limiting for MVP. Upstash Free can remain optional. |
| Paid job/workflow platform | **Avoided as required dependency** | Use database job tables and scheduled/manual workers first. Inngest Free can remain optional. |
| Paid production deployment assumptions | **Avoided** | Use Vercel Hobby or local deployment for MVP. Be aware of platform limits. |
| Paid email plan | **Avoided** | Use Resend Free or console/dev email adapter. |
| Payment subscription | **Avoided** | Use PayMongo only because it has no setup/monthly fee; transaction fees apply only when real payments are collected. |

---

# Final Recommended Free-Account Stack

## 1. Core Framework

### Stack

```txt
Next.js App Router
React
TypeScript
```

### Dependencies

```bash
npm install next react react-dom
npm install -D typescript @types/node @types/react @types/react-dom
```

### Use

Used for:

- Customer storefront
- Merchant dashboard
- Super admin dashboard
- Product pages
- Cart and checkout pages
- API routes
- Server Actions
- Webhook endpoints
- SEO pages
- Server-side rendering

### Why This Fits

Next.js gives you frontend pages, backend routes, server actions, layouts, and SEO support in one codebase.

This is ideal for your app because you effectively have three systems:

```txt
1. Customer Storefront
2. Merchant Admin Dashboard
3. Super Admin Platform
```

A modular monolith is the best starting architecture. Avoid microservices for MVP.

---

## 2. UI System

### Stack

```txt
Tailwind CSS
shadcn/ui
Lucide React
```

### Dependencies

```bash
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/postcss
```

Initialize shadcn/ui:

```bash
npx shadcn@latest init
```

### Use

Used for:

- Storefront components
- Merchant dashboard UI
- Super admin UI
- Product cards
- Data tables
- Dialogs
- Dropdown menus
- Forms
- Navigation/sidebar
- Tabs
- Badges
- Status indicators

### Why This Fits

Tailwind CSS and shadcn/ui are free, customizable, and developer-friendly.

shadcn/ui is especially good for admin dashboards because you own the components directly in your codebase.

---

## 3. Authentication

### Stack

```txt
Clerk Free Plan
Custom Merchant System in PostgreSQL
Custom RBAC in PostgreSQL
```

### Dependencies

```bash
npm install @clerk/nextjs
```

Optional:

```bash
npm install @clerk/themes
```

### Use

Clerk is used only for:

- Signup
- Login
- Logout
- Session management
- Email verification
- Password reset
- Social login
- Protected routes
- Current authenticated user identity

### What Not to Depend On

Do **not** make Clerk Organizations a required part of the app.

Instead of this:

```txt
Clerk Organization = Merchant Store
```

Use this:

```txt
Clerk User = Authenticated identity
PostgreSQL Merchant = Store / tenant
PostgreSQL Merchant Member = Staff membership
PostgreSQL Role = App role
PostgreSQL Permission = App permission
```

### Why This Fits

This keeps Clerk as the identity provider while your own database controls the e-commerce domain.

That means your app is not blocked by organization feature limits, org pricing changes, or advanced Clerk role/permission restrictions.

---

## 4. Merchant and Multi-Tenant System

### Stack

```txt
PostgreSQL
Drizzle ORM
Custom tenant isolation
```

### Dependencies

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

### Use

Used for:

- Merchant/store creation
- Merchant onboarding
- Merchant profile
- Merchant settings
- Merchant staff
- Merchant roles
- Merchant permissions
- Tenant-scoped products
- Tenant-scoped inventory
- Tenant-scoped orders
- Tenant-scoped reports

### Recommended Tables

```txt
merchants
merchant_members
roles
permissions
role_permissions
merchant_member_roles
merchant_invites
audit_logs
```

### Why This Fits

The merchant system is core business logic. It should live in your database, not inside an external auth provider.

Every merchant-owned record should include:

```txt
merchantId
```

Examples:

```txt
products.merchantId
inventory.merchantId
orders.merchantId
discounts.merchantId
media_files.merchantId
reports.merchantId
```

---

## 5. Authorization and Permissions

### Stack

```txt
Custom RBAC
Database permissions
Server-side guards
```

### Dependencies

No extra permission package required.

Use your existing database and server utilities.

### Use

Used for:

- Merchant owner access
- Merchant admin access
- Moderator/editor access
- Inventory staff access
- Order staff access
- Viewer access
- Super admin access
- Product permissions
- Inventory permissions
- Order permissions
- Discount permissions
- Report permissions
- Merchant settings permissions

### Recommended Permission Format

```txt
products:create
products:read
products:update
products:delete

inventory:read
inventory:update
inventory:adjust

orders:read
orders:update
orders:cancel
orders:refund

discounts:create
discounts:update
discounts:delete

reports:view
reports:export

merchant_users:invite
merchant_users:update
merchant_users:remove

settings:update
```

### Why This Fits

Your app needs granular control over merchant staff actions.

Hardcoded roles are not enough because staff permissions differ by module and action.

---

## 6. Database

### Stack

```txt
PostgreSQL
Neon Free Plan
Local PostgreSQL for development
```

### Dependencies

```bash
npm install postgres
```

Alternative driver:

```bash
npm install pg
npm install -D @types/pg
```

### Use

Used for:

- Users profile mirror
- Merchants
- Merchant members
- Roles and permissions
- Products
- Product variants
- Brands
- Categories
- Tags
- Inventory
- Inventory logs
- Carts
- Orders
- Payments
- Invoices
- Discounts
- Reports
- Media records
- Notifications
- Audit logs
- Import jobs

### Why This Fits

PostgreSQL is the correct database for this app because the domain is relational and transaction-heavy.

You need:

- Joins
- Transactions
- Foreign keys
- Constraints
- Indexes
- Reporting queries
- Search support
- Tenant isolation

Neon Free is enough for MVP/prototype usage. For local development, use Docker PostgreSQL.

---

## 7. ORM and Migrations

### Stack

```txt
Drizzle ORM
Drizzle Kit
```

### Dependencies

```bash
npm install drizzle-orm
npm install -D drizzle-kit
npm install postgres
```

### Use

Used for:

- Database schema
- Type-safe queries
- Migrations
- Product queries
- Inventory transactions
- Tenant-scoped queries
- Order creation
- Payment records
- Reports
- Audit logs

### Why This Fits

Drizzle is lightweight, SQL-friendly, and strongly typed.

It is a good fit for a serious e-commerce app because it does not hide the database from you.

---

## 8. Files and Media

### Stack

```txt
UploadThing Free Plan
PostgreSQL media metadata
```

### Dependencies

```bash
npm install uploadthing @uploadthing/react
```

### Use

Used for:

- Product images
- Product gallery
- Brand logos
- Category images
- Merchant logo
- Merchant banner
- Import spreadsheet uploads
- Optional invoice PDF storage
- Media library records

### Recommended Upload Routes

```txt
productImage
productGallery
brandLogo
categoryImage
merchantLogo
merchantBanner
importSpreadsheet
invoicePdf
```

### Recommended Media Table

```txt
media_files
- id
- merchantId
- uploadedByUserId
- uploadthingFileKey
- url
- name
- size
- type
- mimeType
- usageType
- entityType
- entityId
- createdAt
```

### Why This Fits

UploadThing has a free tier and works well with Next.js and TypeScript.

Store file metadata in your database so you can build:

- Media library
- Product image relationships
- Brand/category image management
- Import history
- Invoice file records
- Delete unused assets

### Important Free-Tier Rule

Keep uploads optimized:

- Compress product images before upload
- Limit gallery count
- Limit file size
- Delete unused media
- Avoid storing large videos
- Avoid using UploadThing as general-purpose file storage

---

## 9. Forms and Validation

### Stack

```txt
React Hook Form
Zod
@hookform/resolvers
```

### Dependencies

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Use

Used for:

- Product forms
- Variant forms
- Brand forms
- Category forms
- Tag forms
- Discount forms
- Inventory adjustment forms
- Checkout forms
- Merchant settings forms
- Staff invite forms
- Import validation forms

### Why This Fits

Zod lets you define shared validation schemas for both client and server.

React Hook Form gives efficient form state management for complex dashboard forms.

---

## 10. Server State and Data Tables

### Stack

```txt
TanStack Query
TanStack Table
```

### Dependencies

```bash
npm install @tanstack/react-query @tanstack/react-table
```

### Use

Used for:

- Product tables
- Inventory tables
- Order tables
- Discount tables
- Staff tables
- Reports tables
- Pagination
- Filtering
- Sorting
- Client-side caching
- Mutations

### Why This Fits

Merchant and admin dashboards are table-heavy.

TanStack Table gives full control over table behavior and design. TanStack Query handles dashboard data fetching and caching.

---

## 11. Search

### Stack

```txt
PostgreSQL Full-Text Search
Optional self-hosted Meilisearch later
```

### Dependencies

No additional dependency required for MVP PostgreSQL search.

Optional local/self-hosted Meilisearch:

```bash
npm install meilisearch
```

### Use

Used for:

- Product keyword search
- Product filtering
- Product sorting
- Search by brand
- Search by category
- Search by tags
- Search by availability

### Why This Fits

PostgreSQL full-text search is free and already available in your database.

For MVP, avoid Meilisearch Cloud because it can introduce paid cloud dependency later.

Recommended MVP search strategy:

```txt
Use PostgreSQL indexes first.
Use full-text search for product name and description.
Use normal indexes for brandId, categoryId, price, status, and merchantId.
Add self-hosted Meilisearch only when PostgreSQL search is no longer enough.
```

---

## 12. Payments

### Stack

```txt
Manual Payment Methods for MVP
PayMongo Test Mode / Optional Live Integration
```

### Dependencies

PayMongo can be integrated using native `fetch`.

No SDK is required.

### Use

MVP/free-account payment options:

- Cash on delivery
- Manual GCash payment
- Manual Maya payment
- Bank transfer
- PayMongo test mode
- PayMongo live mode later

### Why This Fits

A payment gateway is not truly free once real payments happen because transaction fees apply.

For a zero-subscription MVP, start with manual payment methods and order status tracking.

Use PayMongo later if you want automated payment confirmation, GCash, Maya, card payments, and webhooks. PayMongo has no setup fee or monthly fee, but transaction fees apply on successful payments.

### Recommended Payment Statuses

```txt
pending
awaiting_manual_confirmation
paid
failed
cancelled
refunded
```

---

## 13. Background Jobs

### Stack

```txt
Database-backed job table
Manual/admin job runner
Optional Inngest Free later
```

### Dependencies

No required dependency for MVP.

Optional:

```bash
npm install inngest
```

Alternative local worker runner:

```bash
npm install -D tsx
```

### Use

Used for:

- Product import processing
- Inventory import processing
- Discount activation
- Discount expiration
- Invoice generation
- Search indexing
- Email sending
- Low-stock alerts

### Recommended MVP Tables

```txt
jobs
job_attempts
import_jobs
import_job_errors
```

### Why This Fits

Background job platforms can become plan-limited as the app grows.

For a free-first MVP, use your own database job records first. Then run jobs through:

```txt
Manual admin trigger
Local worker script
GitHub Actions scheduled workflow
Optional Inngest Free account
```

---

## 14. Cache and Rate Limiting

### Stack

```txt
Database-backed rate limits for MVP
Optional Upstash Redis Free later
```

### Dependencies

No required dependency for database-backed MVP rate limiting.

Optional Upstash:

```bash
npm install @upstash/redis @upstash/ratelimit
```

### Use

Used for:

- API rate limiting
- Checkout request protection
- Upload request protection
- Webhook deduplication
- Import progress tracking
- Optional caching

### Why This Fits

A Redis service is useful, but not required for the first build.

Start with PostgreSQL-backed rate limiting and idempotency tables:

```txt
rate_limits
idempotency_keys
webhook_events
```

Add Upstash Free only if needed.

---

## 15. Email and Notifications

### Stack

```txt
Resend Free Plan
React Email
Console email adapter for local development
PostgreSQL in-app notifications
```

### Dependencies

```bash
npm install resend react-email @react-email/components
```

### Use

Used for:

- Signup success email
- Order confirmation email
- Payment update email
- Order status update email
- Refund email
- Merchant new order email
- Low stock alert email
- Discount expiry email
- Failed payment alert email

### Why This Fits

Resend has a free tier suitable for MVP transactional emails.

For local development, use a console adapter first:

```txt
Instead of sending real email, log the email payload in the terminal.
```

This prevents wasting free email quota while building.

---

## 16. In-App Notifications

### Stack

```txt
PostgreSQL notification table
Server Actions
TanStack Query
```

### Dependencies

No special dependency required beyond:

```bash
npm install @tanstack/react-query drizzle-orm
```

### Use

Used for:

- Customer order updates
- Merchant new order alerts
- Low stock alerts
- Discount expiry alerts
- Failed payment alerts
- Super admin monitoring alerts

### Recommended Table

```txt
notifications
- id
- merchantId
- userId
- type
- title
- message
- readAt
- createdAt
```

### Why This Fits

In-app notifications should stay in your database because they are user-specific, merchant-scoped, auditable, and queryable.

---

## 17. Import and Export

### Stack

```txt
ExcelJS
xlsx
PapaParse
UploadThing
Zod
```

### Dependencies

```bash
npm install exceljs xlsx papaparse
npm install -D @types/papaparse
```

### Use

Used for:

- Product Excel import
- Inventory Excel import
- Category import
- Brand import
- Tag import
- Product export
- Inventory export
- Orders export
- Reports export
- CSV export

### Why This Fits

These libraries are open-source packages and do not require paid accounts.

Recommended import flow:

```txt
Upload file through UploadThing
Create import job in PostgreSQL
Validate rows with Zod
Preview import result
Store row errors
Apply valid rows to database
```

---

## 18. PDF Invoice Generation

### Stack

```txt
@react-pdf/renderer
```

### Dependencies

```bash
npm install @react-pdf/renderer
```

Optional alternative:

```bash
npm install puppeteer
```

### Use

Used for:

- Invoice PDF generation
- Downloadable invoices
- Merchant invoice records
- Customer invoice copies
- Order invoice exports

### Why This Fits

`@react-pdf/renderer` is enough for MVP invoices and avoids paid PDF services.

Use Puppeteer later only if you need pixel-perfect HTML-to-PDF rendering.

---

## 19. Charts and Analytics

### Stack

```txt
Recharts
PostgreSQL aggregate queries
```

### Dependencies

```bash
npm install recharts
```

### Use

Used for:

- Revenue charts
- Sales trends
- Best sellers
- Order analytics
- Inventory analytics
- Dashboard charts
- Super admin reports

### Why This Fits

Recharts is free and works well with React dashboards.

Use PostgreSQL aggregate queries for reports before adding external analytics tools.

---

## 20. Testing

### Stack

```txt
Vitest
Testing Library
Playwright
```

### Dependencies

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @playwright/test
```

### Use

Used for:

- Unit tests
- Component tests
- Form validation tests
- Permission tests
- Product workflow tests
- Checkout tests
- Payment status tests
- Merchant dashboard E2E tests
- Super admin E2E tests

### Why This Fits

All listed testing tools are free and open-source.

Critical flows to test:

```txt
Signup
Merchant onboarding
Staff invitation
Product creation
Inventory update
Add to cart
Checkout
Manual payment confirmation
Order status update
Invoice generation
Permission restrictions
```

---

## 21. Deployment

### Stack

```txt
Vercel Hobby
Neon Free
UploadThing Free
Resend Free
Optional Upstash Free
```

### Dependencies

Optional Vercel CLI:

```bash
npm install -D vercel
```

### Use

Used for:

- Hosting the Next.js app
- Preview deployments
- Production-like testing
- Environment variables
- Webhook endpoints
- Serverless functions

### Why This Fits

Vercel Hobby is convenient for a free Next.js MVP.

Important note:

```txt
Free hosting plans have usage limits and may have commercial restrictions.
For learning, MVP, portfolio, and early prototype use, free plans are enough.
For real commercial production, review each provider's latest terms.
```

---

# Removed or Downgraded Tech

## Removed as Required Stack

```txt
Clerk Organizations
Clerk Organization Roles
Clerk Organization Permissions
Meilisearch Cloud
Paid Redis plan
Paid Inngest plan
Paid Vercel plan
Stripe subscription/billing dependency
Paid PDF generation service
Paid email plan
Paid analytics tools
```

## Replaced With

```txt
Custom merchant tables
Custom RBAC tables
PostgreSQL full-text search
PostgreSQL-backed rate limits
PostgreSQL-backed job records
Manual payment options
Resend Free
Local/dev adapters
Open-source libraries
```

---

# Updated Production Dependencies

```bash
npm install next react react-dom
npm install @clerk/nextjs
npm install uploadthing @uploadthing/react
npm install drizzle-orm postgres
npm install zod react-hook-form @hookform/resolvers
npm install @tanstack/react-query @tanstack/react-table
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install resend react-email @react-email/components
npm install exceljs xlsx papaparse
npm install @react-pdf/renderer
npm install recharts
```

## Optional Production Dependencies

```bash
npm install @upstash/redis @upstash/ratelimit
npm install inngest
npm install meilisearch
```

Use optional dependencies only when the free tier is enough or when self-hosting locally.

---

# Updated Development Dependencies

```bash
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D tailwindcss @tailwindcss/postcss
npm install -D drizzle-kit
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @playwright/test
npm install -D @types/papaparse
npm install -D eslint prettier
npm install -D tsx
```

---

# Recommended Project Structure

```txt
src/
  app/
    (storefront)/
      page.tsx
      products/
      cart/
      checkout/

    (merchant)/
      dashboard/
      products/
      inventory/
      orders/
      discounts/
      reports/
      settings/
      staff/

    (super-admin)/
      admin/
      merchants/
      users/
      reports/
      settings/

    api/
      uploadthing/
      webhooks/
        clerk/
        paymongo/
      jobs/
      cron/

  components/
    ui/
    storefront/
    merchant/
    super-admin/

  db/
    schema/
      auth.ts
      merchants.ts
      roles.ts
      products.ts
      inventory.ts
      orders.ts
      payments.ts
      media.ts
      notifications.ts
      jobs.ts
    migrations/
    queries/

  features/
    auth/
    merchants/
    merchant-members/
    permissions/
    products/
    inventory/
    discounts/
    cart/
    checkout/
    payments/
    orders/
    invoices/
    reports/
    notifications/
    media/
    imports/
    search/

  lib/
    clerk/
    permissions/
    uploadthing/
    paymongo/
    email/
    jobs/
    rate-limit/
    validators/
    utils/
```

---

# Module-to-Tech Mapping

| Module | Free-Account Stack |
|---|---|
| Authentication | Clerk Free |
| Merchant Workspaces | PostgreSQL custom merchants table |
| Merchant Staff | PostgreSQL merchant members + invites |
| RBAC | PostgreSQL roles/permissions |
| Products | Next.js + Drizzle + PostgreSQL |
| Product Images | UploadThing Free + media table |
| Brands | Drizzle + UploadThing |
| Categories | Drizzle + UploadThing |
| Tags | Drizzle |
| Inventory | PostgreSQL + Drizzle transactions |
| Discounts | PostgreSQL + database job table |
| Product Import | UploadThing + ExcelJS + Zod + job table |
| Product Export | ExcelJS |
| Storefront Search | PostgreSQL full-text search |
| Cart | PostgreSQL |
| Checkout | PostgreSQL + manual payment methods |
| Payments | Manual payment first, PayMongo optional |
| Orders | PostgreSQL + Drizzle |
| Invoices | @react-pdf/renderer |
| Reports | PostgreSQL aggregate queries + Recharts |
| Notifications | PostgreSQL + Resend Free |
| Rate Limiting | PostgreSQL first, Upstash Free optional |
| Background Jobs | PostgreSQL job table, Inngest Free optional |
| Testing | Vitest + Playwright |
| Deployment | Vercel Hobby + Neon Free + UploadThing Free |

---

# Final Free-Account Stack

```txt
Next.js App Router
React
TypeScript
Tailwind CSS
shadcn/ui
Clerk Free
Custom PostgreSQL Merchant System
Custom PostgreSQL RBAC
UploadThing Free
PostgreSQL
Neon Free
Drizzle ORM
Zod
React Hook Form
TanStack Query
TanStack Table
PostgreSQL Full-Text Search
Manual Payments
PayMongo Optional
Database Job Table
Resend Free
React Email
ExcelJS
@react-pdf/renderer
Recharts
Vitest
Playwright
Vercel Hobby
```

---

# Final Recommendation

For a free-account-only build, use this architecture:

```txt
Clerk = authentication only
PostgreSQL = merchants, tenants, roles, permissions, commerce data
UploadThing = media uploads within free-tier limits
PostgreSQL full-text search = MVP search
Manual payments = MVP checkout
PayMongo = optional no-monthly-fee payment gateway
Database jobs = MVP background tasks
Resend Free = transactional emails
Vercel Hobby + Neon Free = free hosting and database for MVP
```

This keeps the app buildable without paid subscriptions while preserving the correct architecture for a future production upgrade.

---

# Free-Account Verification Notes

Pricing and free-tier limits can change. Before building production features around a provider, re-check the provider's current pricing page.

As of this update:

- Clerk has a free plan, but this stack does not require Clerk Organizations.
- UploadThing has a free plan suitable for small MVP media storage.
- Neon has a free Postgres plan suitable for development and prototypes.
- Vercel has a free Hobby plan suitable for personal projects and MVP testing.
- Resend has a free plan suitable for low-volume transactional email.
- Upstash and Inngest have free options, but this stack treats them as optional.
- PayMongo has no setup fee or monthly fee, but real successful payments have transaction fees.
