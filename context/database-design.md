# Multi-Tenant E-Commerce App — Database Schema

## Overview

This database design supports a multi-tenant e-commerce platform with:

- Customer authentication
- Merchant authentication
- Merchant staff roles and permissions
- Product management
- Brand, category, and tag management
- Product variants
- Inventory and stock movement tracking
- Discounts and promotions
- Cart and checkout
- Multi-merchant orders
- Payments
- Invoices
- Import/export jobs
- Reports and analytics
- Notifications
- SEO metadata
- Media management
- Audit logs

---

## 1. Identity & Authentication

### `users`

Stores all platform users, including customers, merchants, staff, and super admins.

```txt
users
- id UUID PK
- first_name VARCHAR
- last_name VARCHAR
- display_name VARCHAR
- email VARCHAR UNIQUE
- email_verified_at TIMESTAMP NULL
- password_hash TEXT NULL
- phone VARCHAR NULL
- avatar_url TEXT NULL
- status ENUM('active', 'inactive', 'suspended', 'pending')
- last_login_at TIMESTAMP NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

---

### `user_identities`

Stores social login accounts.

```txt
user_identities
- id UUID PK
- user_id UUID FK -> users.id
- provider ENUM('google', 'facebook', 'instagram')
- provider_user_id VARCHAR
- provider_email VARCHAR NULL
- access_token TEXT NULL
- refresh_token TEXT NULL
- token_expires_at TIMESTAMP NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `user_sessions`

Stores database-backed sessions.

```txt
user_sessions
- id UUID PK
- user_id UUID FK -> users.id
- session_token TEXT UNIQUE
- ip_address VARCHAR NULL
- user_agent TEXT NULL
- expires_at TIMESTAMP
- created_at TIMESTAMP
```

---

### `password_reset_tokens`

```txt
password_reset_tokens
- id UUID PK
- user_id UUID FK -> users.id
- token_hash TEXT
- expires_at TIMESTAMP
- used_at TIMESTAMP NULL
- created_at TIMESTAMP
```

---

### `email_verification_tokens`

```txt
email_verification_tokens
- id UUID PK
- user_id UUID FK -> users.id
- token_hash TEXT
- expires_at TIMESTAMP
- used_at TIMESTAMP NULL
- created_at TIMESTAMP
```

---

## 2. Merchant / Tenant Management

### `merchants`

Main tenant table.

```txt
merchants
- id UUID PK
- owner_user_id UUID FK -> users.id
- name VARCHAR
- slug VARCHAR UNIQUE
- description TEXT NULL
- logo_media_id UUID NULL FK -> media_assets.id
- banner_media_id UUID NULL FK -> media_assets.id
- email VARCHAR NULL
- phone VARCHAR NULL
- website_url TEXT NULL
- status ENUM('pending_approval', 'active', 'suspended', 'inactive')
- onboarding_status ENUM('not_started', 'in_progress', 'completed')
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

---

### `merchant_settings`

Stores merchant-specific configuration.

```txt
merchant_settings
- id UUID PK
- merchant_id UUID UNIQUE FK -> merchants.id
- currency_code CHAR(3)
- timezone VARCHAR
- tax_enabled BOOLEAN
- tax_rate NUMERIC(8,4) NULL
- shipping_enabled BOOLEAN
- payment_settings JSONB
- notification_settings JSONB
- store_settings JSONB
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `merchant_addresses`

Stores merchant business, pickup, or return addresses.

```txt
merchant_addresses
- id UUID PK
- merchant_id UUID FK -> merchants.id
- type ENUM('business', 'pickup', 'return')
- recipient_name VARCHAR
- phone VARCHAR NULL
- address_line_1 TEXT
- address_line_2 TEXT NULL
- city VARCHAR
- province VARCHAR
- postal_code VARCHAR
- country VARCHAR
- is_default BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

## 3. Roles, Permissions & Merchant Staff

### `roles`

Stores global and merchant-specific roles.

```txt
roles
- id UUID PK
- merchant_id UUID NULL FK -> merchants.id
- name VARCHAR
- key VARCHAR
- scope ENUM('global', 'merchant')
- description TEXT NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Example role keys:

```txt
super_admin
customer
merchant_owner
merchant_admin
moderator
editor
inventory_staff
order_staff
viewer
```

---

### `permissions`

Stores granular permissions.

```txt
permissions
- id UUID PK
- key VARCHAR UNIQUE
- module VARCHAR
- action VARCHAR
- description TEXT NULL
- created_at TIMESTAMP
```

Example permission keys:

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

---

### `role_permissions`

Connects roles to permissions.

```txt
role_permissions
- id UUID PK
- role_id UUID FK -> roles.id
- permission_id UUID FK -> permissions.id
- created_at TIMESTAMP
```

---

### `merchant_members`

Connects users to merchant workspaces.

```txt
merchant_members
- id UUID PK
- merchant_id UUID FK -> merchants.id
- user_id UUID FK -> users.id
- role_id UUID FK -> roles.id
- status ENUM('invited', 'active', 'inactive', 'removed')
- invited_by_user_id UUID NULL FK -> users.id
- joined_at TIMESTAMP NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `merchant_invitations`

Stores employee invitations.

```txt
merchant_invitations
- id UUID PK
- merchant_id UUID FK -> merchants.id
- email VARCHAR
- role_id UUID FK -> roles.id
- token_hash TEXT
- invited_by_user_id UUID FK -> users.id
- status ENUM('pending', 'accepted', 'expired', 'cancelled')
- expires_at TIMESTAMP
- accepted_at TIMESTAMP NULL
- created_at TIMESTAMP
```

---

## 4. Media & File Management

### `media_assets`

Stores images, documents, invoices, import files, and export files.

```txt
media_assets
- id UUID PK
- merchant_id UUID NULL FK -> merchants.id
- uploaded_by_user_id UUID NULL FK -> users.id
- file_name VARCHAR
- original_file_name VARCHAR
- mime_type VARCHAR
- file_size_bytes BIGINT
- storage_provider ENUM('local', 's3', 'cloudinary', 'uploadthing')
- storage_key TEXT
- public_url TEXT
- alt_text VARCHAR NULL
- width INT NULL
- height INT NULL
- metadata JSONB
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

---

## 5. Catalog Management

### `brands`

```txt
brands
- id UUID PK
- merchant_id UUID FK -> merchants.id
- name VARCHAR
- slug VARCHAR
- description TEXT NULL
- logo_media_id UUID NULL FK -> media_assets.id
- status ENUM('active', 'inactive')
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

Constraint:

```txt
UNIQUE(merchant_id, slug)
```

---

### `categories`

Supports nested categories.

```txt
categories
- id UUID PK
- merchant_id UUID FK -> merchants.id
- parent_id UUID NULL FK -> categories.id
- name VARCHAR
- slug VARCHAR
- description TEXT NULL
- image_media_id UUID NULL FK -> media_assets.id
- status ENUM('active', 'inactive')
- sort_order INT
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

Constraint:

```txt
UNIQUE(merchant_id, slug)
```

---

### `tags`

```txt
tags
- id UUID PK
- merchant_id UUID FK -> merchants.id
- name VARCHAR
- slug VARCHAR
- status ENUM('active', 'inactive')
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

Constraint:

```txt
UNIQUE(merchant_id, slug)
```

---

## 6. Product Management

### `products`

Stores main product information.

```txt
products
- id UUID PK
- merchant_id UUID FK -> merchants.id
- brand_id UUID NULL FK -> brands.id
- name VARCHAR
- slug VARCHAR
- short_description TEXT NULL
- description TEXT NULL
- sku VARCHAR NULL
- barcode VARCHAR NULL
- base_price_amount BIGINT
- compare_at_price_amount BIGINT NULL
- cost_amount BIGINT NULL
- currency_code CHAR(3)
- status ENUM('draft', 'active', 'archived', 'hidden')
- visibility ENUM('public', 'private')
- is_featured BOOLEAN
- is_trending BOOLEAN
- is_bestseller BOOLEAN
- published_at TIMESTAMP NULL
- created_by_user_id UUID FK -> users.id
- updated_by_user_id UUID NULL FK -> users.id
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

Constraints:

```txt
UNIQUE(merchant_id, slug)
UNIQUE(merchant_id, sku)
```

---

### `product_categories`

Many-to-many relationship between products and categories.

```txt
product_categories
- id UUID PK
- product_id UUID FK -> products.id
- category_id UUID FK -> categories.id
- created_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(product_id, category_id)
```

---

### `product_tags`

Many-to-many relationship between products and tags.

```txt
product_tags
- id UUID PK
- product_id UUID FK -> products.id
- tag_id UUID FK -> tags.id
- created_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(product_id, tag_id)
```

---

### `product_media`

Stores product thumbnails and gallery images.

```txt
product_media
- id UUID PK
- product_id UUID FK -> products.id
- media_asset_id UUID FK -> media_assets.id
- type ENUM('thumbnail', 'gallery')
- sort_order INT
- is_primary BOOLEAN
- created_at TIMESTAMP
```

---

## 7. Product Variants

### `product_options`

Stores option groups such as size, color, or material.

```txt
product_options
- id UUID PK
- product_id UUID FK -> products.id
- name VARCHAR
- sort_order INT
- created_at TIMESTAMP
```

---

### `product_option_values`

Stores values under product options.

```txt
product_option_values
- id UUID PK
- product_option_id UUID FK -> product_options.id
- value VARCHAR
- sort_order INT
- created_at TIMESTAMP
```

---

### `product_variants`

Stores purchasable product variants.

```txt
product_variants
- id UUID PK
- merchant_id UUID FK -> merchants.id
- product_id UUID FK -> products.id
- sku VARCHAR
- barcode VARCHAR NULL
- price_amount BIGINT
- compare_at_price_amount BIGINT NULL
- cost_amount BIGINT NULL
- currency_code CHAR(3)
- status ENUM('active', 'inactive')
- is_default BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

Constraint:

```txt
UNIQUE(merchant_id, sku)
```

---

### `product_variant_option_values`

Connects product variants to option values.

```txt
product_variant_option_values
- id UUID PK
- variant_id UUID FK -> product_variants.id
- option_value_id UUID FK -> product_option_values.id
- created_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(variant_id, option_value_id)
```

---

## 8. Inventory & Stock

### `inventory_items`

One inventory record per product variant.

```txt
inventory_items
- id UUID PK
- merchant_id UUID FK -> merchants.id
- product_id UUID FK -> products.id
- variant_id UUID UNIQUE FK -> product_variants.id
- quantity_on_hand INT
- quantity_reserved INT
- low_stock_threshold INT
- safety_stock_threshold INT
- status ENUM('in_stock', 'low_stock', 'out_of_stock')
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Computed value:

```txt
available_quantity = quantity_on_hand - quantity_reserved
```

Constraints:

```txt
quantity_on_hand >= 0
quantity_reserved >= 0
quantity_reserved <= quantity_on_hand
UNIQUE(variant_id)
```

---

### `stock_movements`

Immutable stock movement history.

```txt
stock_movements
- id UUID PK
- merchant_id UUID FK -> merchants.id
- inventory_item_id UUID FK -> inventory_items.id
- product_id UUID FK -> products.id
- variant_id UUID FK -> product_variants.id
- movement_type ENUM(
    'stock_added',
    'stock_removed',
    'reserved',
    'reservation_released',
    'sold',
    'returned',
    'cancelled_order_restore',
    'damaged',
    'manual_adjustment'
  )
- quantity INT
- previous_quantity_on_hand INT
- new_quantity_on_hand INT
- previous_quantity_reserved INT
- new_quantity_reserved INT
- reference_type VARCHAR NULL
- reference_id UUID NULL
- reason TEXT NULL
- created_by_user_id UUID NULL FK -> users.id
- created_at TIMESTAMP
```

---

## 9. Discounts & Promotions

### `discounts`

```txt
discounts
- id UUID PK
- merchant_id UUID FK -> merchants.id
- name VARCHAR
- code VARCHAR NULL
- description TEXT NULL
- discount_type ENUM('fixed_amount', 'percentage')
- value NUMERIC(12,2)
- max_discount_amount BIGINT NULL
- minimum_order_amount BIGINT NULL
- starts_at TIMESTAMP
- ends_at TIMESTAMP
- status ENUM('draft', 'scheduled', 'active', 'expired', 'disabled')
- is_stackable BOOLEAN
- usage_limit INT NULL
- usage_limit_per_customer INT NULL
- created_by_user_id UUID FK -> users.id
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

Constraint:

```txt
UNIQUE(merchant_id, code)
```

---

### `discount_targets`

Stores what a discount applies to.

```txt
discount_targets
- id UUID PK
- discount_id UUID FK -> discounts.id
- target_type ENUM('store', 'product', 'category', 'brand')
- target_id UUID NULL
- created_at TIMESTAMP
```

Rules:

```txt
target_type = 'store'    -> target_id = NULL
target_type = 'product'  -> target_id = products.id
target_type = 'category' -> target_id = categories.id
target_type = 'brand'    -> target_id = brands.id
```

---

### `discount_usages`

Tracks used discounts.

```txt
discount_usages
- id UUID PK
- merchant_id UUID FK -> merchants.id
- discount_id UUID FK -> discounts.id
- user_id UUID FK -> users.id
- order_id UUID FK -> orders.id
- order_item_id UUID NULL FK -> order_items.id
- discount_amount BIGINT
- used_at TIMESTAMP
```

---

## 10. Customer Addresses

### `user_addresses`

```txt
user_addresses
- id UUID PK
- user_id UUID FK -> users.id
- label VARCHAR NULL
- recipient_name VARCHAR
- phone VARCHAR
- address_line_1 TEXT
- address_line_2 TEXT NULL
- city VARCHAR
- province VARCHAR
- postal_code VARCHAR
- country VARCHAR
- is_default_shipping BOOLEAN
- is_default_billing BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
- deleted_at TIMESTAMP NULL
```

---

## 11. Wishlist / Favorites

### `wishlists`

```txt
wishlists
- id UUID PK
- user_id UUID FK -> users.id
- name VARCHAR
- is_default BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `wishlist_items`

```txt
wishlist_items
- id UUID PK
- wishlist_id UUID FK -> wishlists.id
- product_id UUID FK -> products.id
- variant_id UUID NULL FK -> product_variants.id
- merchant_id UUID FK -> merchants.id
- created_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(wishlist_id, product_id, variant_id)
```

---

## 12. Cart

### `carts`

```txt
carts
- id UUID PK
- user_id UUID NULL FK -> users.id
- session_id VARCHAR NULL
- status ENUM('active', 'checked_out', 'abandoned')
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `cart_items`

```txt
cart_items
- id UUID PK
- cart_id UUID FK -> carts.id
- merchant_id UUID FK -> merchants.id
- product_id UUID FK -> products.id
- variant_id UUID FK -> product_variants.id
- quantity INT
- is_selected BOOLEAN
- saved_for_later BOOLEAN
- added_at TIMESTAMP
- updated_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(cart_id, variant_id)
```

---

## 13. Checkout

### `checkout_sessions`

```txt
checkout_sessions
- id UUID PK
- user_id UUID FK -> users.id
- cart_id UUID FK -> carts.id
- status ENUM('pending', 'completed', 'expired', 'cancelled')
- subtotal_amount BIGINT
- discount_amount BIGINT
- shipping_amount BIGINT
- tax_amount BIGINT
- total_amount BIGINT
- currency_code CHAR(3)
- shipping_address_snapshot JSONB
- billing_address_snapshot JSONB
- notes TEXT NULL
- expires_at TIMESTAMP
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `checkout_session_items`

```txt
checkout_session_items
- id UUID PK
- checkout_session_id UUID FK -> checkout_sessions.id
- merchant_id UUID FK -> merchants.id
- product_id UUID FK -> products.id
- variant_id UUID FK -> product_variants.id
- product_name VARCHAR
- variant_name VARCHAR NULL
- sku VARCHAR
- quantity INT
- unit_price_amount BIGINT
- discount_amount BIGINT
- line_total_amount BIGINT
- product_snapshot JSONB
- created_at TIMESTAMP
```

---

## 14. Orders

## Order Design

A single checkout can contain products from multiple merchants.

Recommended structure:

```txt
order_groups = customer checkout container
orders       = merchant-specific order
order_items  = products under each merchant order
```

---

### `order_groups`

Parent order for the customer.

```txt
order_groups
- id UUID PK
- user_id UUID FK -> users.id
- checkout_session_id UUID FK -> checkout_sessions.id
- order_group_number VARCHAR UNIQUE
- status ENUM('pending', 'confirmed', 'partially_fulfilled', 'completed', 'cancelled', 'refunded')
- payment_status ENUM('pending', 'paid', 'failed', 'partially_refunded', 'refunded', 'cancelled')
- subtotal_amount BIGINT
- discount_amount BIGINT
- shipping_amount BIGINT
- tax_amount BIGINT
- total_amount BIGINT
- currency_code CHAR(3)
- shipping_address_snapshot JSONB
- billing_address_snapshot JSONB
- customer_note TEXT NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `orders`

Merchant-specific order.

```txt
orders
- id UUID PK
- order_group_id UUID FK -> order_groups.id
- merchant_id UUID FK -> merchants.id
- user_id UUID FK -> users.id
- order_number VARCHAR
- status ENUM(
    'pending',
    'confirmed',
    'processing',
    'packed',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
  )
- payment_status ENUM('pending', 'paid', 'failed', 'refunded', 'cancelled')
- fulfillment_status ENUM('unfulfilled', 'partial', 'fulfilled')
- subtotal_amount BIGINT
- discount_amount BIGINT
- shipping_amount BIGINT
- tax_amount BIGINT
- total_amount BIGINT
- currency_code CHAR(3)
- merchant_note TEXT NULL
- tracking_number VARCHAR NULL
- tracking_url TEXT NULL
- confirmed_at TIMESTAMP NULL
- packed_at TIMESTAMP NULL
- shipped_at TIMESTAMP NULL
- delivered_at TIMESTAMP NULL
- cancelled_at TIMESTAMP NULL
- refunded_at TIMESTAMP NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(merchant_id, order_number)
```

---

### `order_items`

Stores product snapshots at purchase time.

```txt
order_items
- id UUID PK
- order_id UUID FK -> orders.id
- merchant_id UUID FK -> merchants.id
- product_id UUID NULL FK -> products.id
- variant_id UUID NULL FK -> product_variants.id
- product_name VARCHAR
- variant_name VARCHAR NULL
- sku VARCHAR
- quantity INT
- unit_price_amount BIGINT
- subtotal_amount BIGINT
- discount_amount BIGINT
- tax_amount BIGINT
- total_amount BIGINT
- product_snapshot JSONB
- created_at TIMESTAMP
```

---

### `order_status_history`

```txt
order_status_history
- id UUID PK
- order_id UUID FK -> orders.id
- previous_status VARCHAR NULL
- new_status VARCHAR
- note TEXT NULL
- changed_by_user_id UUID NULL FK -> users.id
- created_at TIMESTAMP
```

---

### `order_notes`

```txt
order_notes
- id UUID PK
- order_id UUID FK -> orders.id
- user_id UUID FK -> users.id
- note TEXT
- visibility ENUM('internal', 'customer')
- created_at TIMESTAMP
```

---

## 15. Payments & Refunds

### `payments`

Payment belongs to the parent order group.

```txt
payments
- id UUID PK
- order_group_id UUID FK -> order_groups.id
- user_id UUID FK -> users.id
- provider ENUM('stripe', 'gcash', 'maya', 'manual')
- provider_payment_id VARCHAR NULL
- provider_checkout_id VARCHAR NULL
- payment_method ENUM('card', 'gcash', 'maya', 'wallet', 'bank_transfer')
- status ENUM('pending', 'paid', 'failed', 'cancelled', 'refunded')
- amount BIGINT
- currency_code CHAR(3)
- paid_at TIMESTAMP NULL
- failed_at TIMESTAMP NULL
- failure_reason TEXT NULL
- metadata JSONB
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `payment_allocations`

Splits one payment across merchant orders.

```txt
payment_allocations
- id UUID PK
- payment_id UUID FK -> payments.id
- order_id UUID FK -> orders.id
- merchant_id UUID FK -> merchants.id
- amount BIGINT
- currency_code CHAR(3)
- created_at TIMESTAMP
```

---

### `payment_events`

Stores webhook events from payment providers.

```txt
payment_events
- id UUID PK
- provider ENUM('stripe', 'gcash', 'maya')
- event_id VARCHAR
- event_type VARCHAR
- payment_id UUID NULL FK -> payments.id
- order_group_id UUID NULL FK -> order_groups.id
- payload JSONB
- processed_at TIMESTAMP NULL
- created_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(provider, event_id)
```

---

### `refunds`

```txt
refunds
- id UUID PK
- payment_id UUID FK -> payments.id
- order_id UUID NULL FK -> orders.id
- merchant_id UUID NULL FK -> merchants.id
- provider_refund_id VARCHAR NULL
- amount BIGINT
- currency_code CHAR(3)
- reason TEXT NULL
- status ENUM('pending', 'succeeded', 'failed', 'cancelled')
- refunded_by_user_id UUID NULL FK -> users.id
- refunded_at TIMESTAMP NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

## 16. Invoices

### `invoices`

One invoice per merchant order.

```txt
invoices
- id UUID PK
- merchant_id UUID FK -> merchants.id
- order_id UUID UNIQUE FK -> orders.id
- invoice_number VARCHAR
- status ENUM('draft', 'issued', 'paid', 'void', 'refunded')
- issued_at TIMESTAMP NULL
- due_at TIMESTAMP NULL
- subtotal_amount BIGINT
- discount_amount BIGINT
- tax_amount BIGINT
- shipping_amount BIGINT
- total_amount BIGINT
- currency_code CHAR(3)
- customer_snapshot JSONB
- merchant_snapshot JSONB
- billing_address_snapshot JSONB
- pdf_media_id UUID NULL FK -> media_assets.id
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(merchant_id, invoice_number)
```

---

### `invoice_items`

```txt
invoice_items
- id UUID PK
- invoice_id UUID FK -> invoices.id
- order_item_id UUID FK -> order_items.id
- description TEXT
- sku VARCHAR
- quantity INT
- unit_price_amount BIGINT
- discount_amount BIGINT
- tax_amount BIGINT
- total_amount BIGINT
- created_at TIMESTAMP
```

---

## 17. Import / Export

### `import_jobs`

```txt
import_jobs
- id UUID PK
- merchant_id UUID FK -> merchants.id
- uploaded_by_user_id UUID FK -> users.id
- import_type ENUM('products', 'inventory', 'categories', 'brands', 'tags')
- source_media_id UUID FK -> media_assets.id
- status ENUM('pending', 'validating', 'failed', 'completed', 'partially_completed')
- total_rows INT
- successful_rows INT
- failed_rows INT
- error_summary JSONB NULL
- started_at TIMESTAMP NULL
- completed_at TIMESTAMP NULL
- created_at TIMESTAMP
```

---

### `import_job_rows`

```txt
import_job_rows
- id UUID PK
- import_job_id UUID FK -> import_jobs.id
- row_number INT
- raw_data JSONB
- normalized_data JSONB NULL
- status ENUM('pending', 'valid', 'invalid', 'imported', 'failed')
- error_message TEXT NULL
- created_entity_type VARCHAR NULL
- created_entity_id UUID NULL
- created_at TIMESTAMP
```

---

### `export_jobs`

```txt
export_jobs
- id UUID PK
- merchant_id UUID NULL FK -> merchants.id
- requested_by_user_id UUID FK -> users.id
- export_type ENUM('products', 'inventory', 'orders', 'sales_report', 'revenue_report', 'customer_report')
- file_format ENUM('xlsx', 'csv', 'pdf')
- filters JSONB
- status ENUM('pending', 'processing', 'completed', 'failed')
- result_media_id UUID NULL FK -> media_assets.id
- error_message TEXT NULL
- created_at TIMESTAMP
- completed_at TIMESTAMP NULL
```

---

## 18. Reports & Analytics

### `merchant_daily_metrics`

```txt
merchant_daily_metrics
- id UUID PK
- merchant_id UUID FK -> merchants.id
- metric_date DATE
- gross_sales_amount BIGINT
- discount_amount BIGINT
- tax_amount BIGINT
- shipping_amount BIGINT
- net_sales_amount BIGINT
- orders_count INT
- paid_orders_count INT
- cancelled_orders_count INT
- refunded_orders_count INT
- new_customers_count INT
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(merchant_id, metric_date)
```

---

### `product_daily_metrics`

```txt
product_daily_metrics
- id UUID PK
- merchant_id UUID FK -> merchants.id
- product_id UUID FK -> products.id
- variant_id UUID NULL FK -> product_variants.id
- metric_date DATE
- units_sold INT
- gross_sales_amount BIGINT
- net_sales_amount BIGINT
- views_count INT
- favorites_count INT
- cart_additions_count INT
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

## 19. Notifications

### `notifications`

```txt
notifications
- id UUID PK
- merchant_id UUID NULL FK -> merchants.id
- user_id UUID FK -> users.id
- type VARCHAR
- title VARCHAR
- message TEXT
- data JSONB
- status ENUM('unread', 'read', 'archived')
- read_at TIMESTAMP NULL
- created_at TIMESTAMP
```

---

### `notification_deliveries`

```txt
notification_deliveries
- id UUID PK
- notification_id UUID FK -> notifications.id
- channel ENUM('email', 'in_app', 'push')
- status ENUM('pending', 'sent', 'failed')
- provider VARCHAR NULL
- provider_message_id VARCHAR NULL
- error_message TEXT NULL
- sent_at TIMESTAMP NULL
- created_at TIMESTAMP
```

---

### `notification_preferences`

```txt
notification_preferences
- id UUID PK
- user_id UUID FK -> users.id
- merchant_id UUID NULL FK -> merchants.id
- notification_type VARCHAR
- email_enabled BOOLEAN
- in_app_enabled BOOLEAN
- push_enabled BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

## 20. SEO & Search

### `seo_metadata`

Generic SEO metadata table.

```txt
seo_metadata
- id UUID PK
- merchant_id UUID NULL FK -> merchants.id
- target_type ENUM('merchant', 'product', 'category', 'brand')
- target_id UUID
- meta_title VARCHAR
- meta_description TEXT
- slug VARCHAR
- open_graph_media_id UUID NULL FK -> media_assets.id
- structured_data JSONB NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Constraint:

```txt
UNIQUE(merchant_id, target_type, target_id)
```

---

### `search_logs`

```txt
search_logs
- id UUID PK
- user_id UUID NULL FK -> users.id
- merchant_id UUID NULL FK -> merchants.id
- query TEXT
- filters JSONB
- sort VARCHAR NULL
- results_count INT
- created_at TIMESTAMP
```

---

### `product_search_index`

Optional denormalized table for full-text search.

```txt
product_search_index
- product_id UUID PK FK -> products.id
- merchant_id UUID FK -> merchants.id
- name TEXT
- description TEXT
- brand_name TEXT
- category_names TEXT
- tag_names TEXT
- searchable_text TSVECTOR
- updated_at TIMESTAMP
```

Recommended PostgreSQL index:

```txt
GIN(searchable_text)
```

---

## 21. Audit Logs & Login History

### `audit_logs`

Tracks important staff, merchant, and admin actions.

```txt
audit_logs
- id UUID PK
- merchant_id UUID NULL FK -> merchants.id
- actor_user_id UUID NULL FK -> users.id
- action VARCHAR
- entity_type VARCHAR
- entity_id UUID NULL
- old_values JSONB NULL
- new_values JSONB NULL
- ip_address VARCHAR NULL
- user_agent TEXT NULL
- created_at TIMESTAMP
```

Example actions:

```txt
product.created
product.updated
order.status_updated
inventory.adjusted
discount.disabled
merchant.suspended
```

---

### `login_events`

```txt
login_events
- id UUID PK
- user_id UUID NULL FK -> users.id
- email VARCHAR NULL
- status ENUM('success', 'failed')
- provider VARCHAR NULL
- ip_address VARCHAR NULL
- user_agent TEXT NULL
- failure_reason TEXT NULL
- created_at TIMESTAMP
```

---

## 22. Platform Settings

### `platform_settings`

```txt
platform_settings
- id UUID PK
- key VARCHAR UNIQUE
- value JSONB
- description TEXT NULL
- updated_by_user_id UUID NULL FK -> users.id
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Example keys:

```txt
payment_provider_settings
email_provider_settings
default_currency
platform_tax_config
merchant_approval_required
```

---

## 23. Shipping

### `shipping_methods`

```txt
shipping_methods
- id UUID PK
- merchant_id UUID FK -> merchants.id
- name VARCHAR
- description TEXT NULL
- price_amount BIGINT
- currency_code CHAR(3)
- is_active BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

### `shipments`

```txt
shipments
- id UUID PK
- order_id UUID FK -> orders.id
- merchant_id UUID FK -> merchants.id
- shipping_method_id UUID NULL FK -> shipping_methods.id
- courier_name VARCHAR NULL
- tracking_number VARCHAR NULL
- tracking_url TEXT NULL
- status ENUM('pending', 'packed', 'shipped', 'delivered', 'failed', 'returned')
- shipped_at TIMESTAMP NULL
- delivered_at TIMESTAMP NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

---

## Core Relationships

```txt
users
 ├── user_identities
 ├── user_sessions
 ├── user_addresses
 ├── carts
 ├── wishlists
 ├── order_groups
 └── merchant_members

merchants
 ├── merchant_settings
 ├── merchant_members
 ├── brands
 ├── categories
 ├── tags
 ├── products
 ├── discounts
 ├── inventory_items
 ├── orders
 ├── invoices
 ├── import_jobs
 ├── export_jobs
 ├── notifications
 └── audit_logs

products
 ├── product_variants
 ├── product_media
 ├── product_categories
 ├── product_tags
 ├── inventory_items
 └── order_items

order_groups
 ├── orders
 └── payments

orders
 ├── order_items
 ├── order_status_history
 ├── invoices
 ├── shipments
 └── payment_allocations
```

---

## Recommended Indexes

## Tenant Indexes

```txt
INDEX(merchant_id)
```

Apply to:

```txt
products
orders
inventory_items
discounts
brands
categories
tags
audit_logs
notifications
stock_movements
```

---

## Catalog Indexes

```txt
INDEX(products.merchant_id, products.status)
INDEX(products.merchant_id, products.slug)
INDEX(products.merchant_id, products.created_at)
INDEX(products.merchant_id, products.base_price_amount)
INDEX(products.brand_id)
INDEX(product_categories.category_id)
INDEX(product_tags.tag_id)
INDEX(product_variants.product_id)
INDEX(product_variants.merchant_id, product_variants.sku)
```

---

## Order Indexes

```txt
INDEX(order_groups.user_id)
INDEX(order_groups.status)
INDEX(orders.merchant_id, orders.status)
INDEX(orders.merchant_id, orders.created_at)
INDEX(orders.user_id)
INDEX(order_items.product_id)
INDEX(order_items.variant_id)
```

---

## Inventory Indexes

```txt
UNIQUE(inventory_items.variant_id)
INDEX(inventory_items.merchant_id, inventory_items.status)
INDEX(stock_movements.merchant_id, stock_movements.created_at)
INDEX(stock_movements.inventory_item_id)
```

---

## Payment Indexes

```txt
INDEX(payments.order_group_id)
INDEX(payments.provider, payments.provider_payment_id)
UNIQUE(payment_events.provider, payment_events.event_id)
```

---

## Critical Design Rules

## 1. Use `merchant_id` for tenant isolation

Every merchant-owned table should include:

```txt
merchant_id
```

---

## 2. Use variants as the inventory anchor

Recommended flow:

```txt
products -> product_variants -> inventory_items
```

Even simple products should have one default variant.

---

## 3. Use order groups for multi-merchant checkout

Recommended flow:

```txt
checkout_session
  -> order_group
    -> merchant order
      -> order items
```

---

## 4. Snapshot checkout and order data

Snapshot these records:

```txt
product_snapshot
shipping_address_snapshot
billing_address_snapshot
customer_snapshot
merchant_snapshot
```

This prevents historical orders and invoices from changing when live data changes.

---

## 5. Do not reserve stock in cart

Recommended inventory behavior:

```txt
cart item added              = no reservation
checkout started             = reserve stock
payment failed / expired     = release reservation
payment successful           = convert reserved stock to sold stock
```

---

## 6. Use immutable stock movements

Inventory reports should come from:

```txt
stock_movements
```

Not from manually calculated product changes.

---

## 7. Use immutable order records for reports

Reports should be based on:

```txt
orders
order_items
payments
refunds
stock_movements
discount_usages
```

---

## Suggested Build Order

## Phase 1 — Foundation

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

---

## Phase 2 — Catalog

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

---

## Phase 3 — Inventory & Discounts

```txt
inventory_items
stock_movements
discounts
discount_targets
discount_usages
```

---

## Phase 4 — Shopping

```txt
wishlists
wishlist_items
carts
cart_items
checkout_sessions
checkout_session_items
```

---

## Phase 5 — Orders & Payments

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

---

## Phase 6 — Invoices, Reports, Notifications

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

## Conclusion

This schema is designed around the most important rules for your project:

1. Every merchant-owned record is scoped by `merchant_id`.
2. Users are separated from merchant staff membership.
3. Roles and permissions are configurable.
4. Products and inventory are separated.
5. Inventory is tracked through product variants.
6. Orders are split per merchant using `order_groups`.
7. Payments are attached to the parent order group.
8. Merchant revenue is tracked using payment allocations.
9. Invoices are generated per merchant order.
10. Historical data is protected through snapshots.
