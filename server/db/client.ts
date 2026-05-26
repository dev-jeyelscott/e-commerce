import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../../src/db/schema'
import { requireServerEnv } from '../env'

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDb() {
  if (cachedDb) {
    return cachedDb
  }

  const databaseUrl = requireServerEnv('DATABASE_URL')

  const client = postgres(databaseUrl, { prepare: false })
  cachedDb = drizzle(client, { schema })

  return cachedDb
}
