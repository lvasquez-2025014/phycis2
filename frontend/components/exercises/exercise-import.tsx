"use client"

import { useRef, useState, type DragEvent } from "react"
import { FileSpreadsheet, UploadCloud, X } from "lucide-react"
import { toast } from "sonner"
import { DemoNote, Panel, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import type { Exercise } from "@/lib/data"

type PreviewRow = { row: number; name: string; topic: string; answer: string }

const SAMPLE_ROWS: PreviewRow[] = [
  { row: 2, name: "Movimiento rectilíneo uniforme", topic: "Cinemática", answer: "v = 12 m/s" },
  { row: 3, name: "Caída libre desde un edificio", topic: "Cinemática", answer: "t ≈ 3.03 s" },
  { row: 4, name: "Potencia de un motor", topic: "Trabajo y energía", answer: "" },
  { row: 5, name: "Capacitores en paralelo", topic: "Electricidad", answer: "C = 12 μF" },
]

function validate(row: PreviewRow, existing: Exercise[]) {
  if (!row.answer) return { status: "Error", detail: "Falta la respuesta correcta" }
  if (existing.some((e) => e.name.toLowerCase() === row.name.toLowerCase()))
    return { status: "Duplicado", detail: "Ya existe en el banco" }
  return { status: "Válido", detail: "" }
}

const toneFor = { Válido: "success", Duplicado: "warning", Error: "danger" } as const

export function ExerciseImport({ existing }: { existing: Exercise[] }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)

  const accept = (f?: File) => {
    if (!f) return
    if (!/\.(csv|xlsx?)$/i.test(f.name)) {
      toast.error("Formato no soportado. Usa CSV o Excel.")
      return
    }
    setFile(f)
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    accept(e.dataTransfer.files[0])
  }

  const results = SAMPLE_ROWS.map((r) => ({ ...r, ...validate(r, existing) }))
  const validCount = results.filter((r) => r.status === "Válido").length

  if (!file) {
    return (
      <div className="flex flex-col gap-4">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center rounded-xl border-2 border-dashed border-border bg-card px-6 py-16 text-center transition-colors ${dragging ? "border-primary bg-accent/30" : ""}`}
        >
          <UploadCloud className="size-8 text-muted-foreground" aria-hidden />
          <p className="mt-3 text-sm font-medium">Arrastra tu archivo aquí</p>
          <p className="mt-1 text-xs text-muted-foreground">CSV o Excel · columnas: nombre, tema, enunciado, respuesta</p>
          <Button variant="outline" className="mt-5 h-9" onClick={() => inputRef.current?.click()}>
            Seleccionar archivo
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xls,.xlsx"
            className="sr-only"
            aria-label="Seleccionar archivo"
            onChange={(e) => accept(e.target.files?.[0])}
          />
        </div>
        <DemoNote>Simulación de frontend: la vista previa usa registros de ejemplo y no se guarda nada en una base de datos.</DemoNote>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Panel
        title="Vista previa"
        action={
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileSpreadsheet className="size-4" aria-hidden />
            {file.name}
            <button type="button" onClick={() => setFile(null)} className="rounded p-0.5 hover:bg-muted">
              <X className="size-3.5" aria-hidden /><span className="sr-only">Quitar archivo</span>
            </button>
          </span>
        }
      >
        <ul className="divide-y">
          {results.map((r) => (
            <li key={r.row} className="flex items-center gap-4 px-5 py-3">
              <span className="w-12 text-xs text-muted-foreground tabular-nums">Fila {r.row}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.detail || r.topic}</p>
              </div>
              <StatusBadge status={r.status} tone={toneFor[r.status as keyof typeof toneFor]} />
            </li>
          ))}
        </ul>
      </Panel>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {validCount} de {results.length} registros listos para importar
        </p>
        <Button
          className="h-9 px-4"
          onClick={() => {
            toast.success(`Simulación: ${validCount} registros validados. Conecta un backend para guardarlos.`)
            setFile(null)
          }}
        >
          Confirmar importación
        </Button>
      </div>
    </div>
  )
}
