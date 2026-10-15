"use client"

import { useState } from "react"
import { CheckCheck, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/shared"
import { SignalComparatorIllustration } from "@/components/shared/technical-illustrations"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { exercises, formatDate, submissions as seed, type ReviewResult, type Submission } from "@/lib/data"
import { cn } from "@/lib/utils"

export function ValidationView() {
  const [items, setItems] = useState<Submission[]>(seed)
  const [view, setView] = useState<"pending" | "reviewed">("pending")
  const [selectedId, setSelectedId] = useState<string | null>(seed.find((s) => !s.result)?.id ?? null)
  const [notes, setNotes] = useState("")

  const list = items.filter((s) => (view === "pending" ? !s.result : s.result))
  const selected = items.find((s) => s.id === selectedId && list.includes(s)) ?? null
  const exercise = selected && exercises.find((e) => e.id === selected.exerciseId)

  const review = (result: ReviewResult) => {
    if (!selected) return
    const next = items.map((s) => (s.id === selected.id ? { ...s, result, notes } : s))
    setItems(next)
    setNotes("")
    setSelectedId(next.find((s) => !s.result)?.id ?? null)
    toast.success(`Respuesta evaluada como: ${result}`)
  }

  const pendingCount = items.filter((s) => !s.result).length
  const reviewedCount = items.filter((s) => !!s.result).length

  return (
    <>
      <PageHeader
        kicker="Cotejo y Calificación de Reactivos · Metrología"
        title="Validación de Respuestas"
        badge={
          <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            {pendingCount} por calificar
          </span>
        }
        description="Módulo de cotejo y calificación entre procedimientos entregados y respuestas oficiales del banco."
        illustration={<SignalComparatorIllustration />}
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel className="h-fit lg:col-span-2">
          <div className="border-b border-border/80 p-2.5 bg-card">
            <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
              <TabsList className="w-full grid grid-cols-2 text-xs">
                <TabsTrigger value="pending">
                  Pendientes ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="reviewed">
                  Revisadas ({reviewedCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {list.length === 0 ? (
            <EmptyState
              icon={CheckCheck}
              title="Sin entregas en esta sección"
              description={view === "pending" ? "Todas las entregas han sido evaluadas." : "Aún no hay entregas revisadas."}
            />
          ) : (
            <ul className="divide-y divide-border/60">
              {list.map((s) => {
                const ex = exercises.find((e) => e.id === s.exerciseId)
                const isSelected = selected?.id === s.id
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(s.id)
                        setNotes(s.notes ?? "")
                      }}
                      aria-current={isSelected}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors cursor-pointer",
                        isSelected
                          ? "bg-secondary border-l-2 border-l-accent font-medium text-foreground"
                          : "hover:bg-secondary/40 text-foreground",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-xs font-semibold text-foreground">{s.student}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">({s.exerciseId})</span>
                        </div>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {ex?.name ?? "Ejercicio de física"}
                        </p>
                      </div>
                      {s.result ? (
                        <StatusBadge status={s.result} />
                      ) : (
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap font-mono">
                          {formatDate(s.submittedAt)}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </Panel>

        <Panel className="lg:col-span-3">
          {selected && exercise ? (
            <div className="flex flex-col gap-5 p-5">
              {/* Encabezado del ejercicio a validar */}
              <div className="border-b border-border/80 pb-3">
                <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                  <span className="font-mono font-semibold text-primary">{exercise.id}</span>
                  <span>·</span>
                  <span>{exercise.topic}</span>
                  <span>·</span>
                  <span>Entregado el {formatDate(selected.submittedAt)}</span>
                </div>
                <h2 className="mt-1 text-sm font-semibold text-foreground">{exercise.name}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground bg-white p-2.5 rounded border border-border">
                  {exercise.statement}
                </p>
              </div>

              {/* Comparador de Respuestas: Estudiante vs Oficial */}
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Lado Estudiante */}
                <div className="rounded-md border border-border bg-white p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Respuesta del estudiante
                    </span>
                    <span className="text-[11px] font-medium text-foreground">
                      {selected.student}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-sm font-bold text-foreground">
                    {selected.answer}
                  </p>
                  {selected.procedure ? (
                    <div className="mt-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Procedimiento adjunto:
                      </span>
                      <p className="mt-1 rounded bg-secondary/50 p-2 font-mono text-xs text-foreground border border-border">
                        {selected.procedure}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 text-[11px] text-muted-foreground italic">
                      Sin procedimiento detallado.
                    </p>
                  )}
                </div>

                {/* Lado Oficial */}
                <div className="rounded-md border border-border bg-card p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Solución oficial del banco
                    </span>
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-primary border border-border">
                      Clave esperada
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-sm font-bold text-primary">
                    {exercise.answer}
                  </p>
                  <div className="mt-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Criterio de evaluación:
                    </span>
                    <p className="mt-1 rounded bg-white p-2 font-mono text-xs text-foreground border border-border">
                      {exercise.hasSteps
                        ? "Requiere formulación algebraica, despeje y unidades en el resultado final."
                        : "Comprobar coincidencia numérica con tolerancia de redondeo (±0.05)."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Acciones de Validación */}
              {selected.result ? (
                <div className="rounded-md border border-border bg-secondary/40 p-3.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Estado de la revisión:</span>
                    <StatusBadge status={selected.result} />
                  </div>
                  {selected.notes && (
                    <div className="mt-2 text-foreground">
                      <span className="font-semibold text-primary">Retroalimentación del docente: </span>
                      {selected.notes}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3 border-t border-border/80 pt-3">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="review-notes" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Retroalimentación para el estudiante (opcional)
                    </label>
                    <Textarea
                      id="review-notes"
                      rows={2}
                      placeholder="Ej. Procedimiento correcto, presta atención a las cifras significativas..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="text-xs bg-white"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 flex-1 text-xs font-medium border-[#BFDFBF] text-[#1E5631] bg-[#EAF3EA] hover:bg-[#D8ECD8]"
                      onClick={() => review("Correcta")}
                    >
                      <CheckCircle className="mr-1.5 size-3.5" />
                      Marcar Correcta
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 flex-1 text-xs font-medium border-[#FCD8AC] text-[#8C4A00] bg-[#FEF5EA] hover:bg-[#FBE9D2]"
                      onClick={() => review("Parcial")}
                    >
                      <AlertTriangle className="mr-1.5 size-3.5" />
                      Marcar Parcial
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-8 flex-1 text-xs font-medium border-[#F7C6BF] text-[#9A2617] bg-[#FDF0ED] hover:bg-[#F9DDD8]"
                      onClick={() => review("Incorrecta")}
                    >
                      <XCircle className="mr-1.5 size-3.5" />
                      Marcar Incorrecta
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              icon={CheckCheck}
              title="Selecciona una respuesta"
              description="Elige una entrega de la columna izquierda para cotejar el procedimiento con la clave oficial."
            />
          )}
        </Panel>
      </div>
    </>
  )
}
