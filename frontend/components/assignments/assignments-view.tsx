"use client"

import { useState } from "react"
import { CalendarDays, Plus } from "lucide-react"
import { toast } from "sonner"
import { NativeSelect, PageHeader, Panel, SearchInput, StatusBadge } from "@/components/shared"
import { FreeBodyDiagramIllustration } from "@/components/shared/technical-illustrations"
import { Button } from "@/components/ui/button"
import {
  assignments as seed,
  collections,
  formatDate,
  formatLabel,
  type Assignment,
} from "@/lib/data"
import { AssignmentDialog } from "./assignment-dialog"

export function AssignmentsView({ openCreate }: { openCreate: boolean }) {
  const [items, setItems] = useState<Assignment[]>(seed)
  const [creating, setCreating] = useState(openCreate)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("")

  const q = query.toLowerCase()
  const filtered = items.filter(
    (a) =>
      (!q || a.name.toLowerCase().includes(q) || a.target.toLowerCase().includes(q)) &&
      (!status || a.status === status),
  )

  return (
    <>
      <PageHeader
        kicker="Planificación y Hojas de Trabajo · Física Experimental"
        title="Asignaciones Académicas"
        badge={
          <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            {items.length} tareas
          </span>
        }
        description="Gestión de hojas de trabajo, vinculación por carné de estudiante y formatos de entrega."
        illustration={<FreeBodyDiagramIllustration />}
        actions={
          <Button
            size="sm"
            className="h-8 gap-1.5 px-3 text-xs shadow-2xs font-medium"
            onClick={() => setCreating(true)}
          >
            <Plus className="size-3.5" aria-hidden /> Crear asignación
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex flex-col gap-2.5 border-b border-border/80 p-3.5 sm:flex-row sm:items-center">
            <SearchInput
              placeholder="Buscar por asignación o carné..."
              aria-label="Buscar asignaciones"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <NativeSelect aria-label="Filtrar por estado" className="sm:w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Todos los estados</option>
              <option>Activa</option>
              <option>Vencida</option>
              <option>Completada</option>
            </NativeSelect>
          </div>
          <ul className="divide-y divide-border/60">
            {filtered.map((a) => (
              <li key={a.id} className="px-4 py-3.5 hover:bg-secondary/40 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{a.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {a.target} · <span className="font-mono">{a.exercises} ejercicios</span>
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <CalendarDays className="size-3 text-muted-foreground" aria-hidden />
                    Límite: {formatDate(a.dueDate)}
                  </span>
                  <span>Formatos: {a.formats.map(formatLabel).join(", ")}</span>
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-5 py-10 text-center text-xs text-muted-foreground">Sin asignaciones que coincidan con la búsqueda.</li>
            )}
          </ul>
        </Panel>

        <Panel title="Colecciones temáticas" className="h-fit">
          <ul className="divide-y divide-border/60 text-xs">
            {collections.map((c) => (
              <li key={c.id} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition-colors">
                <span className="font-medium text-foreground">{c.name}</span>
                <span className="text-[11px] font-mono text-primary bg-secondary px-2 py-0.5 rounded border border-border">
                  {c.count} ej.
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <AssignmentDialog
        open={creating}
        onOpenChange={setCreating}
        onCreate={(a) => {
          setItems((prev) => [{ ...a, id: `AS-${prev.length + 1}` }, ...prev])
          setCreating(false)
          toast.success("Asignación creada (demo local)")
        }}
      />
    </>
  )
}
