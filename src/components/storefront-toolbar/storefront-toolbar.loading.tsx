export function StorefrontToolbarLoading() {
  return (
    <div className="grid gap-4 rounded-lg border bg-card p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="h-10 rounded-md bg-muted" />
      <div className="h-10 w-72 max-w-full rounded-md bg-muted" />
      <div className="h-10 rounded-md bg-muted md:col-span-2" />
    </div>
  )
}
