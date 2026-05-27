import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

export function getServerEnv(name: string) {
  return process.env[name]
}

export function requireServerEnv(name: string) {
  const value = getServerEnv(name)

  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
