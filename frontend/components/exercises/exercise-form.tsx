"use client"

import { useState, useRef, type FormEvent } from "react"
import { ImagePlus, Upload, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"
import { Field, NativeSelect, Panel } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DIFFICULTIES, TOPICS, type Difficulty, type Exercise, type ExerciseStatus } from "@/lib/data"

const REQUIRED = ["name", "topic", "statement"] as const

export function ExerciseForm({
  initial,
  nextId,
  onSave,
  onCancel,
}: {
  initial: Exercise | null
  nextId: string
  onSave: (e: Exercise) => void
  onCancel: () => void
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [diagramUrl, setDiagramUrl] = useState<string | undefined>(initial?.diagramUrl)
  const [diagramCaption, setDiagramCaption] = useState<string>(initial?.diagramCaption ?? "")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 4 opciones de respuesta distintas: A, B, C, D
  const [options, setOptions] = useState<{ A: string; B: string; C: string; D: string }>({
    A: initial?.options?.A ?? (initial?.answer?.startsWith("A:") ? initial.answer.slice(2).trim() : ""),
    B: initial?.options?.B ?? (initial?.answer?.startsWith("B:") ? initial.answer.slice(2).trim() : ""),
    C: initial?.options?.C ?? (initial?.answer?.startsWith("C:") ? initial.answer.slice(2).trim() : ""),
    D: initial?.options?.D ?? (initial?.answer?.startsWith("D:") ? initial.answer.slice(2).trim() : ""),
  })
  const [correctOption, setCorrectOption] = useState<"A" | "B" | "C" | "D">(
    initial?.correctOption ?? "A"
  )

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG o WebP).")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5 MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setDiagramUrl(result)
      toast.success("Diagrama adjuntado con éxito")
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "").trim()

    const nextErrors: Record<string, string> = {}
    for (const key of REQUIRED) if (!get(key)) nextErrors[key] = "Campo obligatorio"
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) return

    // Validar las 4 opciones de respuesta
    if (!options.A.trim() || !options.B.trim() || !options.C.trim() || !options.D.trim()) {
      toast.error("Por favor completa las 4 opciones de respuesta (A, B, C y D).")
      return
    }

    const formattedAnswer = `${correctOption}: ${options[correctOption].trim()}`

    onSave({
      id: initial?.id ?? nextId,
      name: get("name"),
      topic: get("topic"),
      difficulty: initial?.difficulty ?? "Intermedio",
      status: initial?.status ?? "Aprobado",
      statement: get("statement"),
      options: {
        A: options.A.trim(),
        B: options.B.trim(),
        C: options.C.trim(),
        D: options.D.trim(),
      },
      correctOption,
      answer: formattedAnswer,
      hasSteps: false,
      diagramUrl,
      diagramCaption: diagramCaption.trim() || undefined,
      createdAt: initial?.createdAt ?? new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Panel title="Información general">
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <Field label="Nombre del ejercicio" htmlFor="name" required error={errors.name} className="sm:col-span-1">
            <Input id="name" name="name" defaultValue={initial?.name} aria-invalid={!!errors.name} placeholder="Ej. Caída libre desde un edificio" />
          </Field>
          <Field label="Tema" htmlFor="topic" required error={errors.topic} className="sm:col-span-1">
            <NativeSelect id="topic" name="topic" defaultValue={initial?.topic ?? ""} aria-invalid={!!errors.topic}>
              <option value="" disabled>Selecciona un tema</option>
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </NativeSelect>
          </Field>
          <Field label="Enunciado del problema" htmlFor="statement" required error={errors.statement} className="sm:col-span-2">
            <Textarea id="statement" name="statement" rows={3} defaultValue={initial?.statement} aria-invalid={!!errors.statement} placeholder="Describe detalladamente el problema de física..." />
          </Field>
          <Field label="Datos proporcionados" htmlFor="givens" hint="Uno por línea, ej. h = 45 m">
            <Textarea id="givens" name="givens" rows={2} />
          </Field>
          <Field label="Fórmula o principio aplicable" htmlFor="formula">
            <Textarea id="formula" name="formula" rows={2} placeholder="h = ½ g t²" />
          </Field>
        </div>
      </Panel>

      {/* Panel para subir Diagrama o Imagen del ejercicio */}
      <Panel title="Diagrama o Imagen del ejercicio (opcional)">
        <div className="flex flex-col gap-4 p-5">
          <p className="text-xs text-muted-foreground">
            Sube un diagrama de cuerpo libre, plano inclinado, esquema de circuito o ilustración geométrica para complementar el problema.
          </p>

          {diagramUrl ? (
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
              <div className="flex max-h-56 max-w-xs items-center justify-center overflow-hidden rounded border border-border bg-white p-2 shrink-0">
                <img
                  src={diagramUrl}
                  alt="Vista previa del diagrama"
                  className="max-h-44 max-w-full rounded object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <Field label="Pie o descripción del diagrama" htmlFor="diagramCaption">
                  <Input
                    id="diagramCaption"
                    name="diagramCaption"
                    value={diagramCaption}
                    onChange={(e) => setDiagramCaption(e.target.value)}
                    placeholder="Ej. Figura 1: Diagrama de fuerzas con ángulo θ = 30°"
                    className="bg-white text-xs"
                  />
                </Field>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 gap-1.5 text-xs bg-card border-border hover:bg-secondary"
                  >
                    <Upload className="size-3.5" />
                    Cambiar imagen
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDiagramUrl(undefined)
                      setDiagramCaption("")
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="h-8 gap-1.5 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  >
                    <Trash2 className="size-3.5" />
                    Quitar diagrama
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                isDragging
                  ? "border-accent bg-secondary"
                  : "border-border bg-card hover:bg-secondary/40"
              }`}
            >
              <div className="mb-2.5 flex size-10 items-center justify-center rounded-full bg-secondary text-primary border border-border">
                <ImagePlus className="size-5" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Haz clic para seleccionar o arrastra aquí el diagrama o imagen
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Formatos compatibles: PNG, JPG, JPEG, SVG, WebP (máximo 5 MB)
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0])
            }}
          />
        </div>
      </Panel>

      {/* 4 Opciones de respuesta separadas y selector de respuesta correcta */}
      <Panel title="Opciones de respuesta (A, B, C, D)">
        <div className="flex flex-col gap-5 p-5">
          <p className="text-xs text-muted-foreground">
            Ingresa los valores de cada una de las 4 opciones para este ejercicio:
          </p>

          {/* 4 espacios independientes para A, B, C, D */}
          <div className="grid gap-3 sm:grid-cols-2">
            {(["A", "B", "C", "D"] as const).map((opt) => (
              <div
                key={opt}
                className="flex items-center gap-2.5 rounded-md border border-border bg-white p-2.5 shadow-2xs"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded bg-secondary text-xs font-bold text-primary border border-border font-mono">
                  {opt}
                </span>
                <Input
                  value={options[opt]}
                  onChange={(e) => {
                    const val = e.target.value
                    setOptions((prev) => ({ ...prev, [opt]: val }))
                  }}
                  placeholder={
                    opt === "A" ? "Ej. 12" :
                    opt === "B" ? "Ej. 18" :
                    opt === "C" ? "Ej. 24" : "Ej. 30"
                  }
                  className="bg-white text-xs flex-1 h-8"
                  required
                />
              </div>
            ))}
          </div>

          {/* Selector exclusivo para marcar cuál es la correcta */}
          <div className="rounded-lg border border-border bg-card p-3.5">
            <p className="text-xs font-semibold text-foreground mb-2 font-mono uppercase tracking-wider">
              ¿Cuál de las 4 opciones es la respuesta correcta? *
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(["A", "B", "C", "D"] as const).map((opt) => {
                const isSelected = correctOption === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setCorrectOption(opt)}
                    className={`flex items-center justify-center gap-1.5 rounded-md border py-2 px-2.5 text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? "border-accent bg-primary text-white shadow-2xs font-semibold"
                        : "border-border bg-white text-foreground hover:bg-secondary/40"
                    }`}
                  >
                    <span>Opción {opt}</span>
                    {options[opt].trim() && (
                      <span
                        className={`text-[10px] truncate max-w-[70px] ${
                          isSelected ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        ({options[opt].trim()})
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Panel>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" className="h-9 bg-card border-border" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="h-9 px-4">
          Guardar ejercicio
        </Button>
      </div>
    </form>
  )
}
