import { handleSyncCurrentClerkUser } from '../../server/users/sync-current-clerk-user'

type ApiRequest = {
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

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const host = Array.isArray(request.headers.host) ? request.headers.host[0] : request.headers.host
  const syncRequest = new Request(`https://${host ?? 'localhost'}${request.url}`, {
    method: request.method,
    headers: request.headers as HeadersInit,
  })
  const syncResponse = await handleSyncCurrentClerkUser(syncRequest)

  for (const [header, value] of syncResponse.headers) {
    response.setHeader(header, value)
  }

  response.status(syncResponse.status).send(await syncResponse.text())
}
