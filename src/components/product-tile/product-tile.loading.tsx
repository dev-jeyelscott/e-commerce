import { Card, CardContent, CardFooter } from '@/components/ui/card'

export function ProductTileLoading() {
  return (
    <Card className="gap-3 py-0">
      <div className="aspect-square bg-muted" />
      <CardContent className="space-y-2 px-3">
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="h-10 rounded bg-muted" />
        <div className="h-4 w-24 rounded bg-muted" />
      </CardContent>
      <CardFooter className="px-3 pb-3 pt-0">
        <div className="h-6 w-full rounded-md bg-muted" />
      </CardFooter>
    </Card>
  )
}
