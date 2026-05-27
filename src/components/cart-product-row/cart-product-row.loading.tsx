export function CartProductRowLoading() {
  return (
    <article className="grid gap-4 rounded-lg border bg-card p-3 shadow-sm sm:grid-cols-[auto_6rem_minmax(0,1fr)_auto] sm:items-center">
      <div className="h-4 w-4 rounded bg-muted" />
      <div className="h-24 w-24 rounded-lg bg-muted sm:h-20" />
      <div className="space-y-2">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-8 rounded bg-muted" />
        <div className="h-4 w-24 rounded bg-muted" />
      </div>
      <div className="h-10 w-32 rounded-md bg-muted" />
    </article>
  )
}
