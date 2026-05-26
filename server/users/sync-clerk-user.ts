import { sql } from 'drizzle-orm'
import { users } from '../../src/db/schema'
import { getDb } from '../db/client'

type ClerkEmailAddress = {
  id: string
  email_address: string
  verification?: {
    status?: string
  } | null
}

type ClerkPhoneNumber = {
  id: string
  phone_number: string
}

type ClerkUserData = {
  id: string
  first_name: string | null
  last_name: string | null
  username: string | null
  image_url: string | null
  primary_email_address_id: string | null
  primary_phone_number_id: string | null
  email_addresses: ClerkEmailAddress[]
  phone_numbers: ClerkPhoneNumber[]
}

function getPrimaryEmail(user: ClerkUserData) {
  return (
    user.email_addresses.find((email) => email.id === user.primary_email_address_id) ??
    user.email_addresses[0]
  )
}

function getPrimaryPhone(user: ClerkUserData) {
  return (
    user.phone_numbers.find((phone) => phone.id === user.primary_phone_number_id) ??
    user.phone_numbers[0]
  )
}

function getDisplayName(user: ClerkUserData) {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ')

  return fullName || user.username || null
}

export async function syncClerkUserToAppUser(user: ClerkUserData) {
  const db = getDb()
  const primaryEmail = getPrimaryEmail(user)

  if (!primaryEmail) {
    throw new Error(`Clerk user ${user.id} does not have an email address`)
  }

  const now = new Date()
  const primaryPhone = getPrimaryPhone(user)
  const isVerified  = primaryEmail.verification?.status === 'verified'

  await db
    .insert(users)
    .values({
      clerkUserId: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      displayName: getDisplayName(user),
      email: primaryEmail.email_address,
      emailVerifiedAt: isVerified ? now : null,
      phone: primaryPhone?.phone_number ?? null,
      avatarUrl: user.image_url,
      status: 'active',
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: users.clerkUserId,
      set: {
        firstName: user.first_name,
        lastName: user.last_name,
        displayName: getDisplayName(user),
        email: primaryEmail.email_address,
        emailVerifiedAt: isVerified 
         ? sql`COALESCE(${users.emailVerifiedAt}, ${now})`
         : null,
        phone: primaryPhone?.phone_number ?? null,
        avatarUrl: user.image_url,
        updatedAt: now,
      },
    })
}
