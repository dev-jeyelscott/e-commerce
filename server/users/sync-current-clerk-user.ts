import { createClerkClient } from '@clerk/backend'
import type { User } from '@clerk/backend'
import { requireServerEnv } from '../env'
import { syncClerkUserToAppUser } from './sync-clerk-user'

function toClerkWebhookUserData(user: User) {
  return {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    username: user.username,
    image_url: user.imageUrl,
    primary_email_address_id: user.primaryEmailAddressId,
    primary_phone_number_id: user.primaryPhoneNumberId,
    email_addresses: user.emailAddresses.map((email) => ({
      id: email.id,
      email_address: email.emailAddress,
      verification: email.verification
        ? {
            status: email.verification.status,
          }
        : null,
    })),
    phone_numbers: user.phoneNumbers.map((phone) => ({
      id: phone.id,
      phone_number: phone.phoneNumber,
    })),
  }
}

export async function handleSyncCurrentClerkUser(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    })
  }

  try {
    const secretKey = requireServerEnv('CLERK_SECRET_KEY')
    const publishableKey = requireServerEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
    const clerkClient = createClerkClient({ publishableKey, secretKey })
    const requestState = await clerkClient.authenticateRequest(request, {
      acceptsToken: 'session_token',
      clockSkewInMs: 60_000,
    })

    if (!requestState.isAuthenticated) {
      return new Response(requestState.message || 'Clerk session is not authenticated', {
        status: 401,
      })
    }

    const userId = requestState.toAuth().userId

    if (!userId) {
      return new Response('Missing Clerk user id', { status: 401 })
    }

    const user = await clerkClient.users.getUser(userId)

    await syncClerkUserToAppUser(toClerkWebhookUserData(user))

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Current Clerk user sync failed', error)

    return new Response('User sync failed. Check the Vite server console for details.', {
      status: 500,
    })
  }
}
