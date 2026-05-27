export function ProductListingLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div className="h-32 rounded-lg bg-muted" />
      <div className="h-32 rounded-lg bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="aspect-[3/4] rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  )
}
