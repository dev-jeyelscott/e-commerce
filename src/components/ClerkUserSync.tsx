import { useAuth } from '@clerk/react'
import { useEffect } from 'react'

export function ClerkUserSync() {
  const { getToken, isSignedIn, userId } = useAuth()

  useEffect(() => {
    if (!isSignedIn || !userId) {
      return
    }

    const syncKey = `clerk-user-synced:${userId}`

    if (sessionStorage.getItem(syncKey)) {
      return
    }

    const syncUser = async () => {
      const token = await getToken()

      if (!token) {
        return
      }

      try {
        const response = await fetch('/api/users/sync', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  }, [getToken, isSignedIn, userId])

  return null
}
