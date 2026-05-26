import { pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const userStatus = pgEnum('user_status', [
  'active',
  'inactive',
  'suspended',
  'pending',
])

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    displayName: varchar('display_name', { length: 255 }),
    email: varchar('email', { length: 320 }).notNull(),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    phone: varchar('phone', { length: 32 }),
    avatarUrl: varchar('avatar_url', { length: 2048 }),
    status: userStatus('status').notNull().default('active'),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (table) => [
    uniqueIndex('users_clerk_user_id_unique').on(table.clerkUserId),
    uniqueIndex('users_email_unique').on(table.email),
  ],
)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
