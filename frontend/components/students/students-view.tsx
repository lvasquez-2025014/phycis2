"use client"

import { useState, type FormEvent } from "react"
import { ChevronRight, Plus, UserX } from "lucide-react"
import { toast } from "sonner"
import { EmptyState, Field, NativeSelect, PageHeader, Panel, SearchInput, StatusBadge } from "@/components/shared"
import { AtomicOrbitalsIllustration } from "@/components/shared/technical-illustrations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { assignments, documents, formatDate, students as seed, type Student } from "@/lib/data"

const initials = (name: string) =>
  name.split(" ").slice(0, 2).map((p) => p[0]).join("")

export function StudentsView() {
  const [items, setItems] = useState<Student[]>(seed)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("")
  const [adding, setAdding] = useState(false)
  const [profile, setProfile] = useState<Student | null>(null)

  const q = query.toLowerCase()
  const filtered = items.filter(
    (s) =>
      (!q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || (s.carnet && s.carnet.toLowerCase().includes(q))) &&
      (!status || s.status === status),
  )

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Ingresa un nombre y un correo válido.")
      return
    }
    setItems((prev) => [
      { id: `ST-${prev.length + 1}`, name, email, joinedAt: new Date().toISOString().slice(0, 10), activeAssignments: 0, status: "Activo" },
      ...prev,
    ])
    setAdding(false)
    toast.success("Estudiante agregado (demo local)")
  }

  return (
    <>
      <PageHeader
        kicker="Registro y Padrón Académico · Control de Cohorte"
        title="Padrón de Estudiantes"
        badge={
          <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            {items.length} alumnos
          </span>
        }
        description={`${items.length} estudiantes registrados · ${items.filter((s) => s.status === "Activo").length} con matrícula activa en cátedra`}
        illustration={<AtomicOrbitalsIllustration />}
        actions={
          <Button
            size="sm"
            className="h-8 gap-1.5 px-3 text-xs shadow-2xs font-medium"
            onClick={() => setAdding(true)}
          >
            <Plus className="size-3.5" aria-hidden /> Agregar estudiante
          </Button>
        }
      />

      <Panel>
        <div className="flex flex-col gap-2.5 border-b border-border/80 p-3.5 sm:flex-row sm:items-center">
          <SearchInput
            placeholder="Buscar por carné, nombre o correo..."
            aria-label="Buscar estudiantes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <NativeSelect aria-label="Filtrar por estado" className="sm:w-40" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos los estados</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </NativeSelect>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={UserX} title="Sin estudiantes" description="No hay coincidencias con tu criterio de búsqueda." />
        ) : (
          <ul className="divide-y divide-border/60">
            {filtered.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setProfile(s)}
                  className="flex w-full items-center gap-3.5 px-4 py-3 text-left hover:bg-secondary/40 transition-colors cursor-pointer"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-primary border border-border">
                    {initials(s.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-xs font-semibold text-foreground">{s.name}</p>
                      {s.carnet && (
                        <span className="font-mono text-[11px] bg-secondary text-primary border border-border px-1.5 py-0.2 rounded font-medium">
                          Carné {s.carnet}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[11px] text-muted-foreground mt-0.5">
                      {s.email} {s.codigoAcademico ? `· ${s.codigoAcademico}-${s.seccion ?? "A"} (${s.jornada ?? "Matutina"})` : ""}
                    </p>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {s.activeAssignments} asignaciones activas
                  </span>
                  <StatusBadge status={s.status} />
                  <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar estudiante</DialogTitle>
            <DialogDescription>Recibirá acceso a sus asignaciones académicas.</DialogDescription>
          </DialogHeader>
          <form id="add-student" onSubmit={handleAdd} noValidate className="flex flex-col gap-4">
            <Field label="Nombre completo" htmlFor="st-name" required>
              <Input id="st-name" name="name" autoComplete="name" />
            </Field>
            <Field label="Correo institucional" htmlFor="st-email" required>
              <Input id="st-email" name="email" type="email" autoComplete="email" />
            </Field>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdding(false)}>Cancelar</Button>
            <Button type="submit" form="add-student">Agregar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!profile} onOpenChange={(o) => !o && setProfile(null)}>
        <DialogContent className="sm:max-w-md">
          {profile && <StudentProfile student={profile} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

function StudentProfile({ student }: { student: Student }) {
  const studentAssignments = assignments.filter((a) => a.target === student.name || a.targetCarnets?.includes(student.carnet))
  const studentDocs = documents.filter((d) => d.owner === student.name)

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <DialogTitle>{student.name}</DialogTitle>
          {student.carnet && (
            <span className="font-mono text-[11px] bg-secondary text-primary px-2 py-0.5 rounded border border-border font-semibold">
              Carné {student.carnet}
            </span>
          )}
        </div>
        <DialogDescription>
          {student.email} {student.codigoAcademico ? `· ${student.codigoAcademico}-${student.seccion ?? "A"} (${student.jornada ?? "Matutina"})` : ""} · Desde {formatDate(student.joinedAt)}
        </DialogDescription>
      </DialogHeader>
      <ProfileSection title="Asignaciones" empty="Sin asignaciones individuales">
        {studentAssignments.map((a) => (
          <li key={a.id} className="flex items-center justify-between py-2 text-xs">
            <span className="font-medium text-foreground">{a.name}</span>
            <StatusBadge status={a.status} />
          </li>
        ))}
      </ProfileSection>
      <ProfileSection title="Documentos" empty="Aún no ha generado documentos">
        {studentDocs.map((d) => (
          <li key={d.id} className="flex items-center justify-between py-2 text-xs">
            <span className="font-medium text-foreground">{d.name}</span>
            <span className="text-xs text-muted-foreground">{formatDate(d.createdAt)}</span>
          </li>
        ))}
      </ProfileSection>
    </>
  )
}

function ProfileSection({ title, empty, children }: { title: string; empty: string; children: React.ReactNode[] }) {
  return (
    <div className="mt-3">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">{title}</p>
      {children.length ? (
        <ul className="divide-y divide-border/60">{children}</ul>
      ) : (
        <p className="py-2 text-xs text-muted-foreground italic">{empty}</p>
      )}
    </div>
  )
}
