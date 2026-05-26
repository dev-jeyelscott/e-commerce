import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal } from 'lucide-react'

type StorefrontToolbarProps = {
  placeholder: string
  filters: string[]
  sortOptions: string[]
}

export function StorefrontToolbar({
  placeholder,
  filters,
  sortOptions,
}: StorefrontToolbarProps) {
  return (
    <div className="grid gap-4 rounded-lg border bg-card p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="h-10 pl-9" placeholder={placeholder} type="search" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select defaultValue={sortOptions[0]}>
          <SelectTrigger className="h-10 w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="h-10" type="button" variant="outline">
          <SlidersHorizontal />
          Filters
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 md:col-span-2">
        {filters.map((filter) => (
          <Label
            key={filter}
            className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs font-medium"
          >
            <Checkbox />
            {filter}
          </Label>
        ))}
      </div>
    </div>
  )
}
