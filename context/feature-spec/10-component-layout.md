# Use RSC Pattern

I want you to check each custom components and modify it to use the RSC pattern:

Example:

- `base.tsx` acts as the orchestrator, it wraps the async server component inside `Suspense` and provides fallback UI
- `base.server.tsx` fetches data on the server
- `base-loading.tsx` displayed while `base.server.tsx` is fetching
- `base.client.tsx` is the interactive component

## Implementation

create a separate folder for each component under `components` folder, create and follow the above pattern

## Checks when done

- each component is separated by folder
- base.tsx - Suspense + fallback
- base.server.tsx - Data fetching
- base.loading.tsx Fallback
- base.client.tsx - Server action
