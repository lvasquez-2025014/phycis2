import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pagination({
  page,
  pageCount,
  total,
  pageSize = 8,
  onChange,
}: {
  page: number
  pageCount: number
  total: number
  pageSize?: number
  onChange: (page: number) => void
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(total, page * pageSize)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border/80 px-4 py-3 text-xs text-muted-foreground bg-card">
      <div className="flex items-center gap-1.5 font-mono text-[11.5px]">
        <span>Mostrando</span>
        <strong className="text-foreground font-semibold">{from}–{to}</strong>
        <span>de</span>
        <strong className="text-foreground font-semibold">{total}</strong>
        <span>ejercicios</span>
      </div>

      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2.5 text-xs gap-1 border-border text-foreground disabled:opacity-40 hover:bg-secondary cursor-pointer"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          <ChevronLeft className="size-3.5" aria-hidden />
          <span>Anterior</span>
        </Button>

        <span className="px-2 py-0.5 font-mono text-[11px] text-foreground font-medium rounded bg-secondary border border-border">
          {page} / {pageCount}
        </span>

        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2.5 text-xs gap-1 border-border text-foreground disabled:opacity-40 hover:bg-secondary cursor-pointer"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
        >
          <span>Siguiente</span>
          <ChevronRight className="size-3.5" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
