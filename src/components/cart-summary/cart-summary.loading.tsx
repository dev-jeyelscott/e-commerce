import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function CartSummaryLoading() {
  return (
    <Card className="sticky top-6 gap-0">
      <CardHeader className="border-b pb-4">
        <div className="h-5 w-32 rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="h-32 rounded-lg bg-muted" />
        <div className="h-16 rounded-lg bg-muted" />
      </CardContent>
      <CardFooter className="pt-0">
        <div className="h-8 w-full rounded-md bg-muted" />
      </CardFooter>
    </Card>
  )
}
