"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { exercises as seed, type Exercise } from "@/lib/data"
import { ParabolicTrajectoryIllustration } from "@/components/shared/technical-illustrations"
import { ExerciseTable } from "./exercise-table"
import { ExerciseForm } from "./exercise-form"
import { ExerciseImport } from "./exercise-import"

export type BankTab = "todos" | "crear" | "importar"

export function ExerciseBank({ initialTab }: { initialTab: BankTab }) {
  const [tab, setTab] = useState<BankTab>(initialTab)
  const [items, setItems] = useState<Exercise[]>(seed)
  const [editing, setEditing] = useState<Exercise | null>(null)

  const goTo = (next: BankTab) => {
    if (next !== "crear") setEditing(null)
    setTab(next)
  }

  const handleSave = (exercise: Exercise) => {
    setItems((prev) =>
      prev.some((e) => e.id === exercise.id)
        ? prev.map((e) => (e.id === exercise.id ? exercise : e))
        : [exercise, ...prev],
    )
    toast.success(editing ? "Cambios guardados con éxito" : "Nuevo ejercicio agregado al banco")
    goTo("todos")
  }

  return (
    <>
      <PageHeader
        kicker="Catálogo Docente · Área de Física"
        title="Banco de ejercicios"
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-mono font-medium text-foreground shadow-2xs">
            <span className="size-1.5 rounded-full bg-accent" />
            {items.length} ejercicios registrados
          </span>
        }
        description="Catálogo centralizado de problemas de física, reactivos conceptuales y problemas con diagramas para evaluaciones."
        illustration={<ParabolicTrajectoryIllustration />}
        actions={
          tab === "todos" && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-9 px-3.5 text-xs font-medium border-border bg-card text-foreground hover:bg-secondary transition-colors"
                onClick={() => goTo("importar")}
              >
                <span>Importar</span>
              </Button>
              <Button
                className="h-9 px-4 text-xs font-semibold shadow-2xs"
                onClick={() => goTo("crear")}
              >
                <span>Crear ejercicio</span>
              </Button>
            </div>
          )
        }
      />

      <Tabs value={tab} onValueChange={(v) => goTo(v as BankTab)} className="w-full gap-5">
        <TabsList variant="line" className="gap-6">
          <TabsTrigger value="todos" className="gap-2">
            <span>Todos los ejercicios</span>
            <span className="ml-0.5 rounded bg-secondary px-1.5 py-0.2 text-[10px] font-mono text-foreground font-semibold border border-border">
              {items.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="crear" className="gap-2">
            <span>{editing ? "Editar ejercicio" : "Crear ejercicio"}</span>
          </TabsTrigger>
          <TabsTrigger value="importar" className="gap-2">
            <span>Importar ejercicios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos">
          <ExerciseTable
            items={items}
            onEdit={(e) => {
              setEditing(e)
              setTab("crear")
            }}
            onDelete={(id) => {
              setItems((prev) => prev.filter((e) => e.id !== id))
              toast.success("Ejercicio eliminado del banco")
            }}
            onCreateFirst={() => goTo("crear")}
          />
        </TabsContent>
        <TabsContent value="crear">
          <ExerciseForm
            key={editing?.id ?? "new"}
            initial={editing}
            nextId={`EJ-${String(items.length + 1).padStart(3, "0")}`}
            onSave={handleSave}
            onCancel={() => goTo("todos")}
          />
        </TabsContent>
        <TabsContent value="importar">
          <ExerciseImport existing={items} />
        </TabsContent>
      </Tabs>
    </>
  )
}
