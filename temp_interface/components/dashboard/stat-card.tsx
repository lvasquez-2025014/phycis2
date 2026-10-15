import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  trend,
  highlight,
}: {
  label: string
  value: number
  trend?: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-xs transition-all hover:border-accent hover:shadow-md group relative overflow-hidden",
        highlight ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
      )}
    >
      {/* Símbolo técnico sutil de calibración */}
      <div className="pointer-events-none absolute -right-1 -top-1 size-8 opacity-[0.05] text-foreground select-none font-mono text-xl font-bold">
        +
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground font-sans">{label}</span>
      </div>
      <p className="mt-2.5 text-3xl font-extrabold tracking-tight text-foreground tabular-nums font-display">{value}</p>
      {trend ? (
        <p className="mt-1.5 text-xs font-medium text-emerald-700 flex items-center gap-1 font-sans">
          <span className="size-1.5 rounded-full bg-emerald-600" />
          {trend}
        </p>
      ) : (
        <p className="mt-1.5 text-[11px] text-muted-foreground/85 font-mono">Activo en cátedra</p>
      )}
    </div>
  )
}
