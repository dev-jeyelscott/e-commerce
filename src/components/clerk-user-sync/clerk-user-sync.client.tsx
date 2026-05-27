'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'

export function ClerkUserSyncClient() {
  const { isSignedIn, userId } = useAuth()

  useEffect(() => {
    if (!isSignedIn || !userId) {
      return
    }

    const syncKey = `clerk-user-synced:${userId}`

    if (sessionStorage.getItem(syncKey)) {
      return
    }

    const syncUser = async () => {
      try {
        const response = await fetch('/api/users/sync', {
          method: 'POST',
        })

        if (response.ok) {
          sessionStorage.setItem(syncKey, 'true')
        } else {
          console.error('Failed to sync user:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Error syncing user:', error)
      }
    }

    void syncUser()
  }, [isSignedIn, userId])

  return null
}
