import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '@/features/storefront/storefront-data'
import type { CartProduct } from '@/features/cart/cart-data'
import { Minus, Plus, Trash2, TriangleAlert } from 'lucide-react'

type CartProductRowProps = {
  item: CartProduct
  checked?: boolean
  quantity: number
  showCheckbox?: boolean
  showDelete?: boolean
  deletePromptOpen?: boolean
  onCheckedChange?: (checked: boolean) => void
  onDecrease: () => void
  onIncrease: () => void
  onDelete?: () => void
  onDeletePromptChange?: (open: boolean) => void
}

export function CartProductRow({
  item,
  checked = false,
  quantity,
  showCheckbox = false,
  showDelete = false,
  deletePromptOpen = false,
  onCheckedChange,
  onDecrease,
  onIncrease,
  onDelete,
  onDeletePromptChange,
}: CartProductRowProps) {
  const hasDiscount = typeof item.discountedPrice === 'number'

  return (
    <article className="relative grid gap-4 rounded-lg border bg-card p-3 text-card-foreground shadow-sm sm:grid-cols-[auto_6rem_minmax(0,1fr)_auto] sm:items-center">
      {showDelete ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 size-8 text-muted-foreground hover:text-destructive"
          aria-label={`Remove ${item.name}`}
          onClick={onDelete}
        >
          <Trash2 />
        </Button>
      ) : null}

      {showCheckbox ? (
        <div className="flex items-center sm:justify-center">
          <Checkbox
            checked={checked}
            aria-label={`Select ${item.name} for checkout`}
            onCheckedChange={(value) => onCheckedChange?.(value === true)}
          />
        </div>
      ) : null}

      <div className="h-24 w-24 overflow-hidden rounded-lg bg-muted sm:h-20 sm:w-24">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 space-y-2 pr-8 sm:pr-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{item.merchant}</Badge>
          {item.promo ? <Badge variant="outline">{item.promo}</Badge> : null}
        </div>
        <div className="space-y-1">
          <h2 className="font-heading text-sm font-semibold leading-5">{item.name}</h2>
          <p className="text-xs text-muted-foreground">{item.variant}</p>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="font-heading text-base font-semibold text-primary">
                {formatCurrency(item.discountedPrice ?? item.price)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(item.price)}
              </span>
            </>
          ) : (
            <span className="font-heading text-base font-semibold">
              {formatCurrency(item.price)}
            </span>
          )}
        </div>
      </div>

      <div className="flex h-10 w-fit items-center rounded-md border bg-background">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 rounded-r-none"
          aria-label={`Decrease quantity for ${item.name}`}
          onClick={onDecrease}
        >
          <Minus />
        </Button>
        <span className="grid h-10 min-w-10 place-items-center border-x px-3 text-sm font-medium">
          {quantity}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 rounded-l-none"
          aria-label={`Increase quantity for ${item.name}`}
          onClick={onIncrease}
        >
          <Plus />
        </Button>
      </div>

      <AlertDialog open={deletePromptOpen} onOpenChange={onDeletePromptChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <TriangleAlert />
            </AlertDialogMedia>
            <AlertDialogTitle>Remove product from cart?</AlertDialogTitle>
            <AlertDialogDescription>
              Quantity reached zero for {item.name}. Confirm to remove this product from
              the cart layout.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep item</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDelete}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  )
}
