import { loadEnv } from 'vite'

const viteEnv = loadEnv('', process.cwd(), '')

export function getServerEnv(name: string) {
  const value = process.env[name] ?? viteEnv[name]

  if (value && !process.env[name]) {
    process.env[name] = value
  }

  return value
}

export function requireServerEnv(name: string) {
  const value = getServerEnv(name)

  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
