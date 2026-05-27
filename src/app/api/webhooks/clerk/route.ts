import { handleClerkWebhook } from '../../../../../server/webhooks/clerk'

export async function POST(request: Request) {
  return handleClerkWebhook(request)
}

export function GET() {
  return new Response('Method not allowed', {
    status: 405,
    headers: {
      Allow: 'POST',
    },
  })
}
