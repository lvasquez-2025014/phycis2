"use client"

import { useState, useMemo } from "react"
import { Search, Filter, CheckCheck } from "lucide-react"
import { Field, NativeSelect } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ANSWER_FORMATS,
  collections,
  students,
  JORNADAS,
  CODIGOS_ACADEMICOS,
  SECCIONES,
  type AnswerFormatId,
  type Assignment,
} from "@/lib/data"

export function AssignmentDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (a: Omit<Assignment, "id">) => void
}) {
  const [name, setName] = useState("")
  const [selectedCarnets, setSelectedCarnets] = useState<string[]>([])
  const [collection, setCollection] = useState(collections[0].id)
  const [count, setCount] = useState(10)
  const [dueDate, setDueDate] = useState("")
  const [allowPdf, setAllowPdf] = useState(true)
  const [formats, setFormats] = useState<AnswerFormatId[]>(["none", "inline", "steps"])
  const [error, setError] = useState("")

  // Filtros académicos del profesor
  const [filterJornada, setFilterJornada] = useState<string>("")
  const [filterCodigo, setFilterCodigo] = useState<string>("")
  const [filterSeccion, setFilterSeccion] = useState<string>("")
  const [filterQuery, setFilterQuery] = useState<string>("")

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (s.status !== "Activo") return false
      if (filterJornada && s.jornada !== filterJornada) return false
      if (filterCodigo && s.codigoAcademico !== filterCodigo) return false
      if (filterSeccion && s.seccion !== filterSeccion) return false
      if (filterQuery) {
        const q = filterQuery.toLowerCase()
        return s.carnet.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      }
      return true
    })
  }, [filterJornada, filterCodigo, filterSeccion, filterQuery])

  const toggleCarnet = (carnet: string) => {
    setSelectedCarnets((prev) =>
      prev.includes(carnet) ? prev.filter((c) => c !== carnet) : [...prev, carnet],
    )
  }

  const selectAllFiltered = () => {
    const carnetsToAdd = filteredStudents.map((s) => s.carnet)
    setSelectedCarnets((prev) => Array.from(new Set([...prev, ...carnetsToAdd])))
  }

  const clearSelection = () => {
    setSelectedCarnets([])
  }

  const submit = () => {
    if (!name.trim() || selectedCarnets.length === 0 || !dueDate) {
      setError("Completa el nombre, al menos un carné de estudiante y la fecha límite.")
      return
    }
    if (allowPdf && formats.length === 0) {
      setError("Habilita al menos un formato para generar el PDF.")
      return
    }

    const targetDesc =
      selectedCarnets.length === 1
        ? `${students.find((s) => s.carnet === selectedCarnets[0])?.name ?? ""} (Carné ${selectedCarnets[0]})`
        : `${selectedCarnets.length} estudiantes asignados por carné`

    onCreate({
      name: name.trim(),
      target: targetDesc,
      targetCarnets: selectedCarnets,
      jornada: filterJornada || "Matutina",
      codigoAcademico: filterCodigo || "General",
      seccion: filterSeccion || "A",
      exercises: count,
      dueDate,
      status: "Activa",
      formats: allowPdf ? formats : [],
    })

    setName("")
    setSelectedCarnets([])
    setDueDate("")
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-2xl bg-white border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-900">
            Nueva Asignación de Tarea por Carné
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Filtra por jornada, código académico o sección y selecciona los estudiantes a quienes se les asignará el documento y formulario de respuestas.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 text-xs">
          {error && (
            <div className="rounded-md border border-rose-200 bg-rose-50 p-2.5 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <Field label="Nombre de la tarea" htmlFor="as-name" required>
            <Input
              id="as-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Leyes de Newton I · Hoja de Trabajo"
              className="h-8 text-xs bg-white"
            />
          </Field>

          {/* Filtros Académicos */}
          <div className="rounded-md border border-border bg-slate-50/70 p-3">
            <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-700">
              <Filter className="size-3 text-blue-600" />
              <span>Filtros Académicos y Búsqueda por Carné</span>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3">
              <Field label="Jornada" htmlFor="as-jornada">
                <NativeSelect
                  id="as-jornada"
                  value={filterJornada}
                  onChange={(e) => setFilterJornada(e.target.value)}
                >
                  <option value="">Todas las jornadas</option>
                  {JORNADAS.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </NativeSelect>
              </Field>

              <Field label="Código Académico" htmlFor="as-codigo">
                <NativeSelect
                  id="as-codigo"
                  value={filterCodigo}
                  onChange={(e) => setFilterCodigo(e.target.value)}
                >
                  <option value="">Todos los códigos</option>
                  {CODIGOS_ACADEMICOS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </NativeSelect>
              </Field>

              <Field label="Sección" htmlFor="as-seccion">
                <NativeSelect
                  id="as-seccion"
                  value={filterSeccion}
                  onChange={(e) => setFilterSeccion(e.target.value)}
                >
                  <option value="">Todas las secciones</option>
                  {SECCIONES.map((s) => (
                    <option key={s} value={s}>Sección {s}</option>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <div className="mt-3">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por carné (ej. 2021050) o nombre..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="pl-8 text-xs bg-white"
                />
              </div>
            </div>

            {/* Listado de Carnés de Estudiantes */}
            <div className="mt-4 border-t border-border pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-primary">
                  Estudiantes encontrados ({filteredStudents.length}) · Seleccionados: {selectedCarnets.length}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={selectAllFiltered}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Seleccionar todos
                  </button>
                  <span className="text-xs text-muted-foreground">|</span>
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-xs font-medium text-muted-foreground hover:underline"
                  >
                    Limpiar
                  </button>
                </div>
              </div>

              <div className="grid max-h-48 grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-border bg-white p-3">
                {filteredStudents.length === 0 ? (
                  <p className="col-span-2 text-center text-xs text-muted-foreground py-4">
                    No se encontraron estudiantes con los filtros seleccionados.
                  </p>
                ) : (
                  filteredStudents.map((s) => {
                    const isChecked = selectedCarnets.includes(s.carnet)
                    return (
                      <label
                        key={s.id}
                        className={`flex items-start gap-2.5 rounded-md p-2 text-xs transition-colors cursor-pointer border ${
                          isChecked
                            ? "bg-secondary border-accent font-medium text-foreground"
                            : "border-transparent hover:bg-secondary/40 text-foreground"
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleCarnet(s.carnet)}
                          className="mt-0.5"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-primary font-medium">{s.name}</p>
                          <p className="text-[11px] text-muted-foreground font-mono">
                            Carné: {s.carnet} · {s.codigoAcademico}-{s.seccion} ({s.jornada[0]})
                          </p>
                        </div>
                      </label>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Colección de ejercicios" htmlFor="as-col">
              <NativeSelect
                id="as-col"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
              >
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.count} disponibles)
                  </option>
                ))}
              </NativeSelect>
            </Field>

            <Field label="Fecha límite" htmlFor="as-due" required>
              <Input
                id="as-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Field>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3.5">
            <div>
              <p className="text-sm font-medium text-primary">Permitir generación y descarga de PDF</p>
              <p className="text-xs text-muted-foreground">
                El estudiante podrá descargar la tarea asignada en PDF para resolverla en su cuaderno.
              </p>
            </div>
            <Switch checked={allowPdf} onCheckedChange={setAllowPdf} />
          </div>
        </div>

        <DialogFooter className="border-t border-border pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={submit}>
            Asignar Tarea a Carnés Seleccionados
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
