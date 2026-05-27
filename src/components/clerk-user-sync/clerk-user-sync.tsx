import { Suspense } from 'react'

import { ClerkUserSyncLoading } from './clerk-user-sync.loading'
import { ClerkUserSyncServer } from './clerk-user-sync.server'

export function ClerkUserSync() {
  return (
    <Suspense fallback={<ClerkUserSyncLoading />}>
      <ClerkUserSyncServer />
    </Suspense>
  )
}
