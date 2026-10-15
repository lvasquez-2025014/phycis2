import type { ComponentProps, ReactNode } from "react"
import { ChevronDown, Search, type LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  description,
  kicker,
  badge,
  actions,
  illustration,
}: {
  title: string
  description?: string
  kicker?: string
  badge?: ReactNode
  actions?: ReactNode
  illustration?: ReactNode
}) {
  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Retícula técnica decorativa sutil en SVG puro */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-96 opacity-[0.06] select-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <pattern id="header-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#2D3250" strokeWidth="0.75" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#header-grid)" />
      </svg>

      <div className="flex-1 min-w-0 pr-2 relative z-10">
        {kicker && (
          <div className="mb-1.5 flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            <span className="size-2 rounded-full bg-accent" />
            <span>{kicker}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display">{title}</h1>
          {badge}
        </div>
        {description && <p className="mt-1.5 text-xs text-muted-foreground max-w-2xl leading-relaxed">{description}</p>}
      </div>

      <div className="flex items-center gap-3 shrink-0 relative z-10">
        {illustration && (
          <div className="hidden lg:block shrink-0 shadow-2xs rounded-xl">
            {illustration}
          </div>
        )}
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

const tones = {
  success: "bg-[#EAF3EA] text-[#1E5631] border border-[#BFDFBF]",
  warning: "bg-[#FEF5EA] text-[#8C4A00] border border-[#FCD8AC]",
  danger: "bg-[#FDF0ED] text-[#9A2617] border border-[#F7C6BF]",
  info: "bg-[#EBF1F6] text-[#2D3250] border border-[#C5D0DE]",
  neutral: "bg-[#F3EFEA] text-[#7077A1] border border-[#D5CEBF]",
} as const

export type Tone = keyof typeof tones

const statusTone: Record<string, Tone> = {
  Aprobado: "success",
  Activo: "success",
  Activa: "info",
  Listo: "success",
  Completada: "success",
  Correcta: "success",
  "En revisión": "warning",
  Pendiente: "warning",
  Parcial: "warning",
  Borrador: "neutral",
  Inactivo: "neutral",
  Vencida: "danger",
  Incorrecta: "danger",
}

export function StatusBadge({ status, tone }: { status: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold whitespace-nowrap shadow-2xs",
        tones[tone ?? statusTone[status] ?? "neutral"],
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      <span>{status}</span>
    </span>
  )
}

export function SearchInput(props: ComponentProps<typeof Input>) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <Input type="search" className="h-9 rounded-full bg-white pl-9 pr-4 text-xs border-border placeholder:text-muted-foreground shadow-2xs focus:border-primary focus:ring-1 focus:ring-primary" {...props} />
    </div>
  )
}

export function NativeSelect({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className={cn("relative", className)}>
      <select
        className="h-9 w-full appearance-none rounded-xl border border-border bg-white pr-8 pl-3.5 text-xs text-foreground outline-none transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary shadow-2xs cursor-pointer font-medium"
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
    </div>
  )
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card shadow-xs overflow-hidden", className)}>
      {title && (
        <div className="flex flex-col gap-1 border-b border-border/80 px-5 py-3.5 bg-card sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground font-display flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" />
              {title}
            </h2>
            {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted">
        <Icon className="size-5 text-muted-foreground" aria-hidden />
      </span>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-primary">
        {label}
        {required && <span className="ml-0.5 text-red-600" aria-hidden>*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground">{children}</p>
  )
}
