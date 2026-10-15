"use client"

import { useMemo, useState } from "react"
import {
  Eye,
  Pencil,
  SearchX,
  Trash2,
  Image as ImageIcon,
  RotateCcw,
  Search,
  X,
  Plus,
  BookOpen,
  Table as TableIcon,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react"
import { EmptyState, NativeSelect, Panel, StatusBadge } from "@/components/shared"
import { Pagination } from "@/components/pagination"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DIFFICULTIES, TOPICS, formatDate, type Exercise } from "@/lib/data"
import { ScientificPendulumIllustration, TOPIC_SI_UNITS } from "@/components/shared/technical-illustrations"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 8

// Dificultad con escala científica métrica y badges discretos
function DifficultyBadge({ difficulty }: { difficulty?: string }) {
  const d = difficulty ?? "Básico"
  if (d === "Avanzado") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-mono font-medium bg-[#FDF0ED] text-[#9A2617] border border-[#F7C6BF] whitespace-nowrap shadow-2xs">
        <span className="flex gap-0.5" aria-hidden>
          <span className="size-1 rounded-full bg-[#9A2617]" />
          <span className="size-1 rounded-full bg-[#9A2617]" />
          <span className="size-1 rounded-full bg-[#9A2617]" />
        </span>
        <span>Nivel III · Avanzado</span>
      </span>
    )
  }
  if (d === "Intermedio") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-mono font-medium bg-[#FEF5EA] text-[#8C4A00] border border-[#FCD8AC] whitespace-nowrap shadow-2xs">
        <span className="flex gap-0.5" aria-hidden>
          <span className="size-1 rounded-full bg-[#8C4A00]" />
          <span className="size-1 rounded-full bg-[#8C4A00]" />
        </span>
        <span>Nivel II · Intermedio</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-mono font-medium bg-[#EBF1F6] text-[#2D3250] border border-[#D5CEBF] whitespace-nowrap shadow-2xs">
      <span className="size-1 rounded-full bg-[#2D3250]" aria-hidden />
      <span>Nivel I · Básico</span>
    </span>
  )
}

export function ExerciseTable({
  items,
  onEdit,
  onDelete,
  onCreateFirst,
}: {
  items: Exercise[]
  onEdit: (e: Exercise) => void
  onDelete: (id: string) => void
  onCreateFirst?: () => void
}) {
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards")
  const [viewing, setViewing] = useState<Exercise | null>(null)
  const [deleting, setDeleting] = useState<Exercise | null>(null)

  const hasActiveFilters = Boolean(query || topic || difficulty)

  const resetFilters = () => {
    setQuery("")
    setTopic("")
    setDifficulty("")
    setPage(1)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((e) => {
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.statement.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
      const matchesTopic = !topic || e.topic === topic
      const matchesDifficulty = !difficulty || e.difficulty === difficulty
      return matchesQuery && matchesTopic && matchesDifficulty
    })
  }, [items, query, topic, difficulty])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  if (items.length === 0) {
    return (
      <Panel className="w-full">
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <ScientificPendulumIllustration className="mb-4" />
          <h2 className="text-base font-semibold text-foreground font-serif">El banco de reactivos está vacío</h2>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm">
            Aún no has registrado ningún ejercicio en este catálogo. Comienza creando un nuevo problema con opciones múltiples y diagrama, o importa un archivo de datos.
          </p>
          {onCreateFirst && (
            <Button className="mt-4 h-9 gap-1.5 px-4 text-xs font-semibold shadow-2xs" onClick={onCreateFirst}>
              <Plus className="size-3.5" />
              <span>Crear primer ejercicio</span>
            </Button>
          )}
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="w-full">
      {/* BARRA DE HERRAMIENTAS UNIFICADA: Búsqueda, Filtros y Reset */}
      <div className="flex flex-col gap-2.5 border-b border-border/80 p-3.5 bg-card">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            {/* Campo de búsqueda con icono y botón de limpiar individual */}
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="search"
                placeholder="Buscar por nombre, enunciado o código..."
                aria-label="Buscar ejercicios"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
                className="h-9 bg-white pl-8 pr-7 text-xs border-border placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setPage(1)
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
                  title="Borrar texto de búsqueda"
                >
                  <X className="size-3.5" aria-hidden />
                  <span className="sr-only">Borrar texto</span>
                </button>
              )}
            </div>

            {/* Filtro por Tema */}
            <NativeSelect
              aria-label="Filtrar por tema"
              className="w-full sm:w-44"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value)
                setPage(1)
              }}
            >
              <option value="">Todos los temas</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </NativeSelect>

            {/* Filtro por Dificultad */}
            <NativeSelect
              aria-label="Filtrar por dificultad"
              className="w-full sm:w-36"
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value)
                setPage(1)
              }}
            >
              <option value="">Toda dificultad</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </NativeSelect>

            {/* Botón para Limpiar Filtros cuando alguno esté activo */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary gap-1 self-start sm:self-auto cursor-pointer"
                title="Restablecer todos los filtros"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                <span>Limpiar filtros</span>
              </Button>
            )}
          </div>

          {/* Selector de Vista (Tarjetas / Tabla) y Contador */}
          <div className="flex items-center gap-2.5">
            <div className="inline-flex rounded-full border border-border bg-secondary/50 p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 text-xs rounded-full transition-all cursor-pointer font-sans",
                  viewMode === "cards"
                    ? "bg-card text-foreground font-semibold shadow-2xs border border-border/80"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="Vista en tarjetas de laboratorio"
              >
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">Tarjetas</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 text-xs rounded-full transition-all cursor-pointer font-sans",
                  viewMode === "table"
                    ? "bg-card text-foreground font-semibold shadow-2xs border border-border/80"
                    : "text-muted-foreground hover:text-foreground",
                )}
                title="Vista en tabla técnica"
              >
                <TableIcon className="size-3.5" />
                <span className="hidden sm:inline">Tabla</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-full border border-border">
              {filtered.length} {filtered.length === 1 ? "reactivo" : "reactivos"}
            </span>
          </div>
        </div>
      </div>

      {/* ESTADO SIN RESULTADOS PARA LA BÚSQUEDA */}
      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
          <ScientificPendulumIllustration className="mb-3 opacity-80" />
          <p className="text-sm font-semibold text-foreground font-serif">Sin resultados para tu búsqueda</p>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm">
            No encontramos ningún reactivo que coincida con los criterios de búsqueda o filtros seleccionados.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="mt-3.5 h-8 gap-1.5 text-xs border-border bg-card hover:bg-secondary cursor-pointer"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            <span>Restablecer filtros</span>
          </Button>
        </div>
      ) : viewMode === "cards" ? (
        /* VISTA DE TARJETAS DE LABORATORIO */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5 p-4.5 sm:p-5 bg-background/25">
          {rows.map((e) => (
            <div
              key={e.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-2xs hover:border-accent hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div>
                {/* Cabecera de la Tarjeta con Código Specimen y Tema SI */}
                <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary bg-secondary/90 px-2.5 py-0.5 rounded-full border border-border shadow-2xs">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {e.id}
                  </span>
                  <span className="text-[10.5px] font-mono text-muted-foreground font-semibold">
                    {TOPIC_SI_UNITS[e.topic] ?? e.topic}
                  </span>
                </div>

                {/* Título y Enunciado del Reactivo */}
                <div className="mt-3.5">
                  <h3 className="font-display font-bold text-[13.5px] text-foreground group-hover:text-primary transition-colors leading-snug">
                    {e.name}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed font-sans">
                    {e.statement}
                  </p>
                </div>

                {/* Clave de Solución y Esquema Técnico */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/70 px-2.5 py-1 text-[11px] font-mono font-semibold text-primary border border-border/90">
                    <CheckCircle2 className="size-3 text-accent shrink-0" />
                    <span className="text-[10px] text-muted-foreground uppercase font-sans">Solución:</span>
                    <span>{e.answer}</span>
                  </div>
                  {e.diagramUrl && (
                    <span className="inline-flex items-center gap-1 rounded-xl bg-[#FEF5EA] px-2.5 py-1 text-[10.5px] font-mono font-semibold text-[#8C4A00] border border-[#FCD8AC]">
                      <ImageIcon className="size-3 text-accent" />
                      <span>Con diagrama</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Pie de la Tarjeta: Nivel de Dificultad, Estado y Acciones Rápidas */}
              <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <DifficultyBadge difficulty={e.difficulty} />
                  <StatusBadge status={e.status ?? "Aprobado"} />
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewing(e)}
                    className="flex size-7.5 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Vista de laboratorio"
                  >
                    <Eye className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(e)}
                    className="flex size-7.5 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Editar reactivo"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(e)}
                    className="flex size-7.5 items-center justify-center rounded-full hover:bg-[#FDF0ED] text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    title="Eliminar del banco"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLA DE EJERCICIOS */
        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary/40 text-left text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/80">
              <tr>
                <th scope="col" className="px-4 py-3 min-w-[260px]">Ejercicio</th>
                <th scope="col" className="hidden px-4 py-3 md:table-cell w-44">Tema & Magnitudes SI</th>
                <th scope="col" className="hidden px-4 py-3 sm:table-cell w-36">Dificultad</th>
                <th scope="col" className="px-4 py-3 w-28">Estado</th>
                <th scope="col" className="px-4 py-3 text-right w-28">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {rows.map((e) => (
                <tr
                  key={e.id}
                  className="hover:bg-secondary/25 transition-colors group"
                >
                  {/* Columna Ejercicio: Nombre principal, ID y fecha secundarios, indicador de diagrama */}
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-foreground text-xs leading-snug group-hover:text-primary transition-colors">
                        {e.name}
                      </p>
                      {e.diagramUrl && (
                        <span
                          className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-mono font-medium text-foreground border border-border"
                          title="Este ejercicio incluye diagrama o ilustración técnica"
                        >
                          <ImageIcon className="size-3 text-accent" aria-hidden />
                          <span>Diagrama</span>
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                      <span className="inline-flex items-center gap-1 font-semibold text-primary/90 bg-white px-1.5 py-0.2 rounded border border-border/90 text-[10.5px] shadow-2xs">
                        <span className="size-1 rounded-full bg-accent" />
                        {e.id}
                      </span>
                      <span>·</span>
                      <span>Registrado el {formatDate(e.createdAt)}</span>
                    </div>
                  </td>

                  {/* Columna Tema & Unidades SI */}
                  <td className="hidden px-4 py-3.5 text-foreground md:table-cell">
                    <div className="flex flex-col">
                      <span className="font-medium text-xs text-foreground">{e.topic}</span>
                      {TOPIC_SI_UNITS[e.topic] && (
                        <span className="text-[10px] font-mono text-muted-foreground/85 tracking-tight mt-0.5">
                          {TOPIC_SI_UNITS[e.topic]}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Columna Dificultad */}
                  <td className="hidden px-4 py-3.5 sm:table-cell">
                    <DifficultyBadge difficulty={e.difficulty} />
                  </td>

                  {/* Columna Estado */}
                  <td className="px-4 py-3.5">
                    <StatusBadge status={e.status ?? "Aprobado"} />
                  </td>

                  {/* Columna Acciones con tooltips y diferenciación visual */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-7.5 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        onClick={() => setViewing(e)}
                        title="Ver detalles del ejercicio"
                      >
                        <Eye className="size-3.5" aria-hidden />
                        <span className="sr-only">Ver {e.name}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-7.5 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        onClick={() => onEdit(e)}
                        title="Editar ejercicio"
                      >
                        <Pencil className="size-3.5" aria-hidden />
                        <span className="sr-only">Editar {e.name}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="size-7.5 p-1 text-muted-foreground hover:text-rose-700 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                        onClick={() => setDeleting(e)}
                        title="Eliminar este ejercicio"
                      >
                        <Trash2 className="size-3.5" aria-hidden />
                        <span className="sr-only">Eliminar {e.name}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      <Pagination
        page={current}
        pageCount={pageCount}
        total={filtered.length}
        pageSize={PAGE_SIZE}
        onChange={setPage}
      />

      {/* Modal de Vista Detallada */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          {viewing && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-primary text-base font-bold font-serif">{viewing.name}</DialogTitle>
                  {viewing.diagramUrl && (
                    <span className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-mono font-semibold text-primary">
                      <ImageIcon className="size-3 text-accent" /> Con diagrama
                    </span>
                  )}
                </div>
                <DialogDescription className="text-xs text-muted-foreground font-mono">
                  {viewing.id} · {viewing.topic} · Nivel {viewing.difficulty ?? "Básico"}
                </DialogDescription>
              </DialogHeader>

              {/* Enunciado */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  Enunciado del problema:
                </span>
                <p className="leading-relaxed text-xs text-foreground bg-white p-3 rounded-md border border-border">
                  {viewing.statement}
                </p>
              </div>

              {/* Diagrama (si existe) */}
              {viewing.diagramUrl && (
                <div className="flex flex-col items-center rounded-lg border border-border bg-white p-2.5">
                  <img
                    src={viewing.diagramUrl}
                    alt={viewing.diagramCaption ?? "Diagrama del problema"}
                    className="max-h-52 max-w-full rounded object-contain border border-border bg-white p-2"
                  />
                  {viewing.diagramCaption && (
                    <p className="mt-1.5 text-center text-xs font-medium text-muted-foreground">
                      {viewing.diagramCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Opciones A, B, C, D */}
              {viewing.options && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
                    Opciones de respuesta:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(["A", "B", "C", "D"] as const).map((opt) => (
                      <div
                        key={opt}
                        className={`rounded border px-2.5 py-1.5 flex items-center justify-between text-xs ${
                          viewing.correctOption === opt
                            ? "border-[#BFDFBF] bg-[#EAF3EA] font-medium text-[#1E5631]"
                            : "border-border bg-white text-foreground"
                        }`}
                      >
                        <span>
                          <strong className="text-foreground font-mono">{opt}:</strong> {viewing.options?.[opt]}
                        </span>
                        {viewing.correctOption === opt && (
                          <span className="text-[10px] uppercase font-bold text-[#1E5631] bg-[#BFDFBF]/40 px-1 rounded font-mono">
                            Correcta
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solución / Respuesta Registrada */}
              <div className="rounded-lg bg-secondary/50 border border-border p-3">
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Solución / Respuesta registrada en clave:
                </p>
                <p className="mt-1 font-mono font-bold text-sm text-primary">{viewing.answer}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="¿Eliminar ejercicio del banco?"
        description={`"${deleting?.name}" (${deleting?.id}) se eliminará permanentemente del catálogo de ejercicios.`}
        confirmLabel="Eliminar ejercicio"
        onConfirm={() => {
          if (deleting) onDelete(deleting.id)
          setDeleting(null)
        }}
      />
    </Panel>
  )
}
