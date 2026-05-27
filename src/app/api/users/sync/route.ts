import { auth, currentUser } from '@clerk/nextjs/server'

import { syncClerkUserToAppUser } from '../../../../../server/users/sync-clerk-user'

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return new Response('Clerk session is not authenticated', { status: 401 })
  }

  const user = await currentUser()

  if (!user) {
    return new Response('Clerk session is not authenticated', { status: 401 })
  }

  await syncClerkUserToAppUser({
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
  })

  return new Response('OK', { status: 200 })
}

export function GET() {
  return new Response('Method not allowed', {
    status: 405,
    headers: {
      Allow: 'POST',
    },
  })
}
