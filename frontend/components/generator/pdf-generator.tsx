"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { DemoNote, Field, NativeSelect, PageHeader, Panel } from "@/components/shared"
import { DocumentBlueprintIllustration } from "@/components/shared/technical-illustrations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ANSWER_FORMATS,
  assignments,
  exercises,
  type AnswerFormatId,
} from "@/lib/data"
import { cn } from "@/lib/utils"
import { DocumentPreview } from "./document-preview"

export function PdfGenerator() {
  const active = assignments.filter((a) => a.status !== "Completada")
  const [assignmentId, setAssignmentId] = useState(active[0].id)
  const assignment = active.find((a) => a.id === assignmentId)!
  const [format, setFormat] = useState<AnswerFormatId>(assignment.formats[0])
  const [title, setTitle] = useState(assignment.name)
  const [count, setCount] = useState(4)
  const [loading, setLoading] = useState(false)

  const changeAssignment = (id: string) => {
    const next = active.find((a) => a.id === id)!
    setAssignmentId(id)
    setTitle(next.name)
    if (!next.formats.includes(format)) setFormat(next.formats[0])
  }

  const selected = exercises.filter((e) => e.status === "Aprobado").slice(0, count)

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("PDF generado (simulación)", { description: `${title} · ${selected.length} ejercicios` })
    }, 900)
  }

  return (
    <>
      <PageHeader
        kicker="Preparación Documental e Impresión Técnica"
        title="Generador PDF"
        badge={
          <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            Formato Editorial
          </span>
        }
        description="Configura el documento y revisa la vista previa milimétrica antes de exportar el archivo de evaluación."
        illustration={<DocumentBlueprintIllustration />}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Panel title="Configuración">
            <div className="flex flex-col gap-5 p-5">
              <Field label="Asignación" htmlFor="gen-as">
                <NativeSelect id="gen-as" value={assignmentId} onChange={(e) => changeAssignment(e.target.value)}>
                  {active.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </NativeSelect>
              </Field>
              <Field label="Título del documento" htmlFor="gen-title">
                <Input id="gen-title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Field>
              <Field label="Ejercicios en la vista previa" htmlFor="gen-count">
                <Input id="gen-count" type="number" min={1} max={8} value={count} onChange={(e) => setCount(Math.min(8, Math.max(1, Number(e.target.value))))} />
              </Field>

              <fieldset>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                  Formato de respuestas
                </legend>
                <div className="flex flex-col gap-1.5">
                  {ANSWER_FORMATS.map((f) => {
                    const allowed = assignment.formats.includes(f.id)
                    const isSelected = format === f.id
                    return (
                      <label
                        key={f.id}
                        className={cn(
                          "flex items-center gap-2.5 rounded-md border px-3 py-2 text-xs transition-colors cursor-pointer",
                          isSelected
                            ? "border-accent bg-secondary font-medium text-foreground shadow-2xs"
                            : "border-border bg-white text-foreground hover:bg-secondary/40",
                          !allowed && "cursor-not-allowed opacity-50 bg-secondary/30",
                        )}
                      >
                        <input
                          type="radio"
                          name="format"
                          value={f.id}
                          checked={isSelected}
                          disabled={!allowed}
                          onChange={() => setFormat(f.id)}
                          className="size-3.5 accent-primary"
                        />
                        <span>{f.label}</span>
                      </label>
                    )
                  })}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Solo están disponibles los formatos permitidos en la configuración de la asignación.
                </p>
              </fieldset>
            </div>
          </Panel>

          <Button className="h-10" onClick={generate} disabled={loading || !title.trim()}>
            {loading ? <Loader2 className="animate-spin" aria-hidden /> : <Download aria-hidden />}
            {loading ? "Generando..." : "Generar PDF"}
          </Button>
          <DemoNote>La generación es una simulación de frontend; no se crea un archivo real.</DemoNote>
        </div>

        <div className="lg:col-span-3">
          <DocumentPreview title={title} format={format} items={selected} />
        </div>
      </div>
    </>
  )
}
