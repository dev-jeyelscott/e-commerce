export function CheckoutLayoutLoading() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="space-y-6">
        <div className="h-32 rounded-lg bg-muted" />
        <div className="h-96 rounded-lg bg-muted" />
        <div className="h-72 rounded-lg bg-muted" />
      </section>
      <aside className="h-80 rounded-lg bg-muted lg:pt-29" />
    </div>
  )
}
