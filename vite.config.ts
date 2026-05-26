import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { handleClerkWebhook } from './server/webhooks/clerk'
import { handleSyncCurrentClerkUser } from './server/users/sync-current-clerk-user'

async function readRequestBody(request: import('node:http').IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}

// https://vite.dev/config/
export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'clerk-webhook',
      configureServer(server) {
        server.middlewares.use('/api/webhooks/clerk', async (request, response) => {
          if (request.method !== 'POST') {
            response.statusCode = 405
            response.setHeader('Allow', 'POST')
            response.end('Method not allowed')
            return
          }

          const body = await readRequestBody(request)
          const host = request.headers.host ?? 'localhost'
          const webhookRequest = new Request(`http://${host}${request.url}`, {
            method: 'POST',
            headers: request.headers as HeadersInit,
            body,
          })
          const webhookResponse = await handleClerkWebhook(webhookRequest)

          response.statusCode = webhookResponse.status
          response.end(await webhookResponse.text())
        })

        server.middlewares.use('/api/users/sync', async (request, response) => {
          const host = request.headers.host ?? 'localhost'
          const syncRequest = new Request(`http://${host}${request.url}`, {
            method: request.method,
            headers: request.headers as HeadersInit,
          })
          const syncResponse = await handleSyncCurrentClerkUser(syncRequest)

          response.statusCode = syncResponse.status
          for (const [header, value] of syncResponse.headers) {
            response.setHeader(header, value)
          }
          response.end(await syncResponse.text())
        })
      },
    },
  ],
  server: {
    allowedHosts: [
      'unsworn-stock-naturist.ngrok-free.dev',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
