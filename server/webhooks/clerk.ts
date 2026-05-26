import { verifyWebhook } from '@clerk/backend/webhooks'
import { getServerEnv } from '../env'
import { syncClerkUserToAppUser } from '../users/sync-clerk-user'

export async function handleClerkWebhook(request: Request) {
  try {
    getServerEnv('CLERK_WEBHOOK_SIGNING_SECRET')
    const event = await verifyWebhook(request)

    if (event.type === 'user.created') {
      await syncClerkUserToAppUser(event.data)
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Clerk webhook failed', error)

    return new Response('Webhook failed', { status: 400 })
  }
}
