import { handleClerkWebhook } from '../../server/webhooks/clerk'

type ApiRequest = NodeJS.ReadableStream & {
  method?: string
  headers: Record<string, string | string[] | undefined>
  url?: string
}

type ApiResponse = {
  setHeader(name: string, value: string): void
  status(statusCode: number): {
    send(body: string): void
  }
}

async function readBody(request: ApiRequest) {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).send('Method not allowed')
    return
  }

  const body = await readBody(request)
  const host = Array.isArray(request.headers.host) ? request.headers.host[0] : request.headers.host
  const webhookRequest = new Request(`https://${host ?? 'localhost'}${request.url}`, {
    method: 'POST',
    headers: request.headers as HeadersInit,
    body,
  })
  const webhookResponse = await handleClerkWebhook(webhookRequest)

  response.status(webhookResponse.status).send(await webhookResponse.text())
}
