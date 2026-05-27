export function CategoryListingLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div className="h-40 rounded-lg bg-muted" />
      <div className="h-32 rounded-lg bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-48 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  )
}
