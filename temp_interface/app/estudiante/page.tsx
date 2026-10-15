"use client"

import { useState } from "react"
import {
  Calendar,
  Download,
  Send,
  CheckCircle2,
  FileText,
  FileCheck,
  Play,
  Upload,
  X,
  AlertCircle,
  HelpCircle,
} from "lucide-react"
import { toast } from "sonner"
import { StudentHeader } from "@/components/layout/student-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { downloadAssignmentPdf } from "@/lib/download-pdf"
import { useAuth } from "@/lib/auth-context"

export type TaskWorkflowState = "ASSIGNED" | "GENERATED" | "SUBMITTED"

interface TaskItem {
  id: string
  title: string
  assignedBy: string
  dueDateText: string
  dueDateFull: string
  dueColor: string
  workflowState: TaskWorkflowState
  submittedCount: number
  totalExercises: number
  exercises: Array<{
    number: number
    title: string
    statement: string
    userAnswer?: string
    procedure?: string
    diagramUrl?: string
    diagramCaption?: string
    options?: {
      A: string
      B: string
      C: string
      D: string
    }
  }>
}

const INITIAL_STUDENT_TASKS: TaskItem[] = [
  {
    id: "task-1",
    title: "Leyes de Newton I",
    assignedBy: "Prof. Laura Méndez",
    dueDateText: "Vence en 4 días",
    dueDateFull: "18 oct 2026",
    dueColor: "text-amber-700",
    workflowState: "ASSIGNED",
    submittedCount: 0,
    totalExercises: 3,
    exercises: [
      {
        number: 1,
        title: "Segunda ley con dos masas conectadas",
        statement:
          "Dos masas de 2 kg y 3 kg unidas por una cuerda inextensible son jaladas horizontalmente por una fuerza de 20 N sobre una superficie sin fricción. Halla la aceleración del sistema y la tensión en la cuerda.",
      },
      {
        number: 2,
        title: "Fuerza de fricción estática máxima",
        statement:
          "Un mueble de laboratorio de 40 kg reposa en un piso plano con coeficiente μs = 0.5. ¿Qué fuerza horizontal mínima se requiere aplicar para iniciar el movimiento? (usa g = 9.8 m/s²).",
      },
      {
        number: 3,
        title: "Aceleración en plano inclinado",
        statement:
          "Un bloque de masa m = 5 kg se desliza sin fricción hacia abajo por un plano inclinado con un ángulo de 30° respecto a la horizontal. Determina la aceleración paralela al plano.",
        diagramUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 160' width='320' height='160'><polygon points='30,135 290,135 290,25' fill='%23F1F5F9' stroke='%23334155' stroke-width='2'/><rect x='150' y='55' width='44' height='30' rx='2' transform='rotate(-23 172 70)' fill='%231E293B'/><text x='172' y='74' fill='%23ffffff' font-size='10' font-family='sans-serif' font-weight='bold' text-anchor='middle'>m = 5kg</text><path d='M 75,135 A 40,40 0 0,0 68,120' stroke='%2364748B' stroke-width='2' fill='none'/><text x='82' y='128' fill='%230F172A' font-size='12' font-family='sans-serif' font-weight='600'>θ = 30°</text><line x1='172' y1='70' x2='172' y2='110' stroke='%23DC2626' stroke-width='2'/><text x='178' y='108' fill='%23DC2626' font-size='10' font-family='sans-serif'>W = mg</text></svg>",
        diagramCaption: "Diagrama de cuerpo libre en plano inclinado (θ = 30°)",
        options: {
          A: "2.45 m/s²",
          B: "4.90 m/s²",
          C: "9.80 m/s²",
          D: "1.73 m/s²",
        },
      },
    ],
  },
  {
    id: "task-2",
    title: "Repaso de Cinemática (MRU y MRUA)",
    assignedBy: "Prof. Laura Méndez",
    dueDateText: "Vence en 6 días",
    dueDateFull: "20 oct 2026",
    dueColor: "text-muted-foreground",
    workflowState: "GENERATED",
    submittedCount: 0,
    totalExercises: 2,
    exercises: [
      {
        number: 1,
        title: "Alcance horizontal de un proyectil",
        statement:
          "Se dispara un proyectil a una velocidad inicial de v0 = 30 m/s formando un ángulo de 45° sobre la horizontal en un campo abierto. Calcula su alcance horizontal total R considerando g = 9.8 m/s².",
        options: {
          A: "45.9 m",
          B: "91.8 m",
          C: "183.6 m",
          D: "30.0 m",
        },
      },
      {
        number: 2,
        title: "Frenado con desaceleración constante",
        statement:
          "Un automóvil viaja a 72 km/h y frena uniformemente hasta detenerse en una distancia de 40 metros. ¿Cuál fue la magnitud de su desaceleración?",
      },
    ],
  },
]

const PREVIOUS_TASKS: TaskItem[] = [
  {
    id: "task-old-1",
    title: "Trabajo mecánico y conservación de energía",
    assignedBy: "Prof. Laura Méndez",
    dueDateText: "05 oct 2026",
    dueDateFull: "05 oct 2026",
    dueColor: "text-muted-foreground",
    workflowState: "SUBMITTED",
    submittedCount: 1,
    totalExercises: 1,
    exercises: [
      {
        number: 1,
        title: "Trabajo realizado por un resorte",
        statement:
          "Un resorte de constante k = 200 N/m se estira 0.15 m desde su posición de equilibrio. ¿Qué trabajo realiza la fuerza restauradora?",
        userAnswer: "W = -2.25 J",
      },
    ],
  },
]

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"tareas" | "resultados">("tareas")
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_STUDENT_TASKS)
  const [previous] = useState<TaskItem[]>(PREVIOUS_TASKS)

  const [activeResponseTask, setActiveResponseTask] = useState<TaskItem | null>(null)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [userProcedures, setUserProcedures] = useState<Record<number, string>>({})
  const [attachedFile, setAttachedFile] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [viewSubmittedTask, setViewSubmittedTask] = useState<TaskItem | null>(null)

  const handleGenerateTask = (task: TaskItem) => {
    toast.info(`Generando PDF oficial para: ${task.title}...`)

    downloadAssignmentPdf({
      title: task.title,
      studentName: user?.name ?? "Camila Torres",
      carnet: user?.carnet ?? "2021050",
      codigoAcademico: user?.codigoAcademico ?? "IN6AM",
      seccion: user?.seccion ?? "A",
      jornada: user?.jornada ?? "Matutina",
      dueDate: task.dueDateFull,
      exercises: task.exercises.map((e) => ({
        number: e.number,
        title: e.title,
        statement: e.statement,
      })),
    })

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, workflowState: "GENERATED" } : t,
      ),
    )

    toast.success("Hoja de trabajo descargada correctamente", {
      description: "Realiza los cálculos y luego presiona 'Ingresar Respuestas'.",
      duration: 5000,
    })
  }

  const handleOpenResponseForm = (task: TaskItem) => {
    setActiveResponseTask(task)
    const initialAns: Record<number, string> = {}
    const initialProc: Record<number, string> = {}
    task.exercises.forEach((ex) => {
      initialAns[ex.number] = ex.userAnswer ?? ""
      initialProc[ex.number] = ex.procedure ?? ""
    })
    setUserAnswers(initialAns)
    setUserProcedures(initialProc)
    setAttachedFile(null)
  }

  const handleConfirmSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeResponseTask) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)

      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeResponseTask.id
            ? {
                ...t,
                workflowState: "SUBMITTED",
                submittedCount: t.totalExercises,
                exercises: t.exercises.map((ex) => ({
                  ...ex,
                  userAnswer: userAnswers[ex.number] || "Completado",
                  procedure: userProcedures[ex.number] || "",
                })),
              }
            : t,
        ),
      )

      toast.success("Respuestas enviadas exitosamente al docente", {
        description: `Se registraron las respuestas para el carné ${user?.carnet ?? "2021050"}.`,
        duration: 4000,
      })

      setActiveResponseTask(null)
    }, 500)
  }

  return (
    <div className="min-h-svh bg-background">
      <StudentHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        {activeTab === "tareas" ? (
          <>
            {/* Encabezado del Alumno */}
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Bienvenido, {user?.name?.split(" ")[0] ?? "Camila"}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Tienes {tasks.filter((t) => t.workflowState !== "SUBMITTED").length} asignaciones pendientes en tu sección ({user?.codigoAcademico ?? "IN6AM"}-{user?.seccion ?? "A"}).
              </p>
            </div>

            {/* SECCIÓN 1: Tareas Pendientes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tareas Asignadas
                </h2>
                <span className="text-xs font-mono text-muted-foreground">
                  Carné: {user?.carnet ?? "2021050"}
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {tasks.map((task) => {
                  const percentage = Math.round(
                    (task.submittedCount / task.totalExercises) * 100,
                  )
                  const isAssignedOnly = task.workflowState === "ASSIGNED"
                  const isGenerated = task.workflowState === "GENERATED"
                  const isSubmitted = task.workflowState === "SUBMITTED"

                  return (
                    <div
                      key={task.id}
                      className="rounded-lg border border-border bg-card p-4 shadow-2xs transition-colors hover:border-slate-300"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground">
                              {task.title}
                            </h3>

                            {isAssignedOnly && (
                              <span className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                                <AlertCircle className="size-3 text-muted-foreground" /> Asignada
                              </span>
                            )}
                            {isGenerated && (
                              <span className="inline-flex items-center gap-1 rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                                <FileCheck className="size-3" /> Hoja Descargada · Por Resolver
                              </span>
                            )}
                            {isSubmitted && (
                              <span className="inline-flex items-center gap-1 rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                                <CheckCircle2 className="size-3" /> Entregada
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className={`flex items-center gap-1 font-medium ${task.dueColor}`}>
                              <Calendar className="size-3.5" aria-hidden />
                              {task.dueDateText} ({task.dueDateFull})
                            </span>
                            <span>·</span>
                            <span>Docente: {task.assignedBy}</span>
                          </div>

                          <p className="mt-1.5 text-xs text-muted-foreground">
                            {isAssignedOnly &&
                              "Paso 1: Genera el PDF con tu encabezado oficial para iniciar la resolución."}
                            {isGenerated &&
                              "Paso 2: Tarea en proceso. Al finalizar tus cálculos, ingresa tus resultados."}
                            {isSubmitted &&
                              "Has completado la entrega de tus respuestas. El docente procederá a la validación."}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {isAssignedOnly && (
                            <Button
                              type="button"
                              size="sm"
                              className="h-8 text-xs font-medium gap-1.5"
                              onClick={() => handleGenerateTask(task)}
                            >
                              <Play className="size-3 fill-current" aria-hidden />
                              <span>Generar Tarea (PDF)</span>
                            </Button>
                          )}

                          {isGenerated && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs gap-1.5"
                                onClick={() => handleGenerateTask(task)}
                              >
                                <Download className="size-3" aria-hidden />
                                <span>Descargar PDF</span>
                              </Button>

                              <Button
                                type="button"
                                size="sm"
                                className="h-8 text-xs font-medium gap-1.5"
                                onClick={() => handleOpenResponseForm(task)}
                              >
                                <Send className="size-3" aria-hidden />
                                <span>Ingresar Respuestas</span>
                              </Button>
                            </>
                          )}

                          {isSubmitted && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs gap-1.5"
                                onClick={() => handleGenerateTask(task)}
                              >
                                <Download className="size-3" aria-hidden />
                                <span>Descargar PDF</span>
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs gap-1.5 bg-muted/50"
                                onClick={() => setViewSubmittedTask(task)}
                              >
                                <FileText className="size-3" aria-hidden />
                                <span>Ver Respuestas</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-3.5 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full transition-all duration-300 ${
                              isSubmitted ? "bg-emerald-600" : "bg-primary"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                          {task.submittedCount}/{task.totalExercises} problemas entregados
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* SECCIÓN 2: Tareas Anteriores */}
            <div>
              <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Historial de Tareas
              </h2>

              <div className="flex flex-col gap-3">
                {previous.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border border-border bg-card p-4 shadow-2xs"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground">
                            {task.title}
                          </h3>
                          <span className="inline-flex items-center rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Concluida
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="size-3" />
                          Fecha de entrega: {task.dueDateText}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs gap-1"
                          onClick={() => handleGenerateTask(task)}
                        >
                          <Download className="size-3" />
                          <span>PDF</span>
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs bg-muted/50 gap-1"
                          onClick={() => setViewSubmittedTask(task)}
                        >
                          <FileText className="size-3" />
                          <span>Ver entrega</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-5">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Calificaciones y Evaluaciones
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Registro de notas para el carné {user?.carnet ?? "2021050"} emitidas por el Departamento de Física.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg border border-border bg-card p-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Choques y cantidad de movimiento
                    </h3>
                    <p className="text-xs text-muted-foreground">Evaluado el 30 sep 2026 · Sección A</p>
                  </div>
                  <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-800">
                    95 / 100
                  </span>
                </div>
                <div className="mt-3 border-t border-border pt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Comentario del docente: </span>
                  "Excelente cálculo de velocidades y conservación del momento lineal en colisiones elásticas."
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Caída libre y cinemática básica
                    </h3>
                    <p className="text-xs text-muted-foreground">Evaluado el 15 sep 2026 · Sección A</p>
                  </div>
                  <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-800">
                    100 / 100
                  </span>
                </div>
                <div className="mt-3 border-t border-border pt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Comentario del docente: </span>
                  "Despejes algebraicos impecables con unidades del SI bien especificadas."
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: Formulario de Ingreso de Respuestas */}
      {activeResponseTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-lg border border-border bg-card p-5 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Ingreso de Respuestas · {activeResponseTask.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Carné asignado: <span className="font-mono font-medium text-foreground">{user?.carnet ?? "2021050"}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveResponseTask(null)}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmSubmission} className="mt-4 space-y-4 text-xs">
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-foreground flex items-start gap-2">
                <HelpCircle className="size-4 shrink-0 text-primary mt-0.5" />
                <p>
                  Ingresa las respuestas numéricas y unidades calculadas en tu hoja de trabajo. El docente validará el procedimiento registrado.
                </p>
              </div>

              <div className="space-y-3">
                {activeResponseTask.exercises.map((exercise) => (
                  <div
                    key={exercise.number}
                    className="rounded-md border border-border bg-muted/30 p-3.5"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-foreground">
                        Problema {exercise.number}: {exercise.title}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                        Item #{exercise.number}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-2.5 leading-relaxed">
                      {exercise.statement}
                    </p>

                    {exercise.diagramUrl && (
                      <div className="mb-2.5 max-w-sm rounded border border-border bg-card p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={exercise.diagramUrl}
                          alt={exercise.diagramCaption ?? "Diagrama"}
                          className="max-h-36 w-full rounded object-contain"
                        />
                      </div>
                    )}

                    <div className="space-y-2.5">
                      {exercise.options && (
                        <div className="space-y-1">
                          <label className="block text-[11px] font-semibold text-foreground uppercase tracking-wider">
                            Selecciona una opción:
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {(["A", "B", "C", "D"] as const).map((opt) => {
                              const optVal = exercise.options?.[opt]
                              const isSelected =
                                userAnswers[exercise.number] === `${opt}: ${optVal}` ||
                                userAnswers[exercise.number] === optVal ||
                                userAnswers[exercise.number] === opt
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setUserAnswers((prev) => ({
                                      ...prev,
                                      [exercise.number]: `${opt}: ${optVal}`,
                                    }))
                                  }
                                  className={`flex items-center gap-2 rounded border px-2.5 py-1.5 text-left text-xs transition-colors ${
                                    isSelected
                                      ? "border-primary bg-primary/10 font-medium text-foreground ring-1 ring-primary"
                                      : "border-border bg-card text-foreground hover:bg-muted"
                                  }`}
                                >
                                  <span className="flex size-4.5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-foreground border border-border">
                                    {opt}
                                  </span>
                                  <span className="truncate">{optVal}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor={`answer-${exercise.number}`}
                          className="block text-[11px] font-semibold text-foreground mb-1 uppercase tracking-wider"
                        >
                          Respuesta Registrada *
                        </label>
                        <Input
                          id={`answer-${exercise.number}`}
                          value={userAnswers[exercise.number] ?? ""}
                          onChange={(e) =>
                            setUserAnswers((prev) => ({
                              ...prev,
                              [exercise.number]: e.target.value,
                            }))
                          }
                          placeholder="Ej: a = 4.9 m/s², F = 196 N"
                          className="h-8 text-xs bg-card"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`proc-${exercise.number}`}
                          className="block text-[11px] font-medium text-muted-foreground mb-1"
                        >
                          Fórmula o procedimiento clave (Opcional):
                        </label>
                        <Input
                          id={`proc-${exercise.number}`}
                          value={userProcedures[exercise.number] ?? ""}
                          onChange={(e) =>
                            setUserProcedures((prev) => ({
                              ...prev,
                              [exercise.number]: e.target.value,
                            }))
                          }
                          placeholder="Ej: F = m*a -> a = 20N / 5kg = 4 m/s²"
                          className="h-8 text-xs bg-card text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subida de evidencia */}
              <div className="rounded-md border border-dashed border-border bg-muted/40 p-3 text-center">
                <Upload className="mx-auto size-4 text-muted-foreground" />
                <p className="mt-1 text-xs text-muted-foreground">
                  {attachedFile
                    ? `Archivo seleccionado: ${attachedFile}`
                    : "Adjuntar escaneo o fotografía del procedimiento en cuaderno (opcional)"}
                </p>
                <input
                  type="file"
                  id="student-evidence-file"
                  accept="image/*,.pdf"
                  className="sr-only"
                  onChange={(e) =>
                    setAttachedFile(e.target.files?.[0]?.name ?? null)
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-1.5 h-7 text-xs"
                  onClick={() =>
                    document.getElementById("student-evidence-file")?.click()
                  }
                >
                  Examinar archivo
                </Button>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setActiveResponseTask(null)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 text-xs font-medium gap-1.5"
                  disabled={isSubmitting}
                >
                  <Send className="size-3.5" />
                  {isSubmitting ? "Enviando respuestas..." : "Confirmar entrega"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Ver respuestas enviadas */}
      {viewSubmittedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-lg border border-border bg-card p-5 shadow-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Comprobante de Entrega · {viewSubmittedTask.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Carné registrado: <span className="font-mono font-medium text-foreground">{user?.carnet ?? "2021050"}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewSubmittedTask(null)}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-3.5 space-y-3">
              {viewSubmittedTask.exercises.map((ex) => (
                <div
                  key={ex.number}
                  className="rounded-md border border-border bg-muted/40 p-3 text-xs"
                >
                  <p className="font-semibold text-foreground">
                    Problema {ex.number}: {ex.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5">{ex.statement}</p>
                  <div className="mt-2 rounded border border-border bg-card p-2">
                    <span className="font-semibold text-foreground">Respuesta enviada: </span>
                    <span className="font-mono font-bold text-foreground">
                      {ex.userAnswer ?? "Completado"}
                    </span>
                    {ex.procedure && (
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                        <strong>Procedimiento:</strong> {ex.procedure}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                size="sm"
                className="h-8 text-xs border-border bg-muted text-foreground hover:bg-muted/80"
                onClick={() => setViewSubmittedTask(null)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
