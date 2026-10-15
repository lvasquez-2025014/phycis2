"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { PageHeader, Panel, StatusBadge } from "@/components/shared"
import { HarmonicWaveIllustration } from "@/components/shared/technical-illustrations"
import { buttonVariants } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import {
  assignments,
  documents,
  exercises,
  formatDate,
  recentActivity,
  students,
  submissions,
} from "@/lib/data"
import { cn } from "@/lib/utils"

const quickActions = [
  { label: "Crear ejercicio", href: "/ejercicios?tab=crear" },
  { label: "Importar ejercicios", href: "/ejercicios?tab=importar" },
  { label: "Crear asignación", href: "/asignaciones?nueva=1" },
  { label: "Generar PDF", href: "/generador" },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const pending = submissions.filter((s) => !s.result).length

  useEffect(() => {
    if (user && user.role === "STUDENT") {
      router.push("/estudiante")
    }
  }, [user, router])

  return (
    <>
      <PageHeader
        kicker="Centro de Control · Cátedra de Física Fundamental"
        title="Panel de Control Académico"
        badge={
          <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            Ciclo 2026-1
          </span>
        }
        description="Física Fundamental · Colegio Técnico Kinal · Prof. Laura Méndez"
        illustration={<HarmonicWaveIllustration />}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/generador"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-8 px-3.5 text-xs shadow-2xs font-medium",
              )}
            >
              Generar PDF
            </Link>
            <Link
              href="/asignaciones?nueva=1"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-8 px-3.5 text-xs shadow-2xs font-medium",
              )}
            >
              Nueva asignación
            </Link>
          </div>
        }
      />

      {/* Métricas Académicas */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <StatCard label="Ejercicios en banco" value={exercises.length} />
        <StatCard label="Estudiantes registrados" value={students.length} />
        <StatCard
          label="Asignaciones activas"
          value={assignments.filter((a) => a.status === "Activa").length}
          highlight
        />
        <StatCard label="Por validar" value={pending} />
      </div>

      {/* Accesos Rápidos Administrativos */}
      <div className="mt-5 flex flex-wrap items-center gap-2 border-b border-border/80 pb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground font-mono mr-1">
          Accesos directos:
        </span>
        {quickActions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 px-3 text-xs border-border bg-card text-foreground hover:bg-secondary shadow-2xs font-normal",
            )}
          >
            {a.label}
          </Link>
        ))}
      </div>

      {/* Secciones de Contenido: Asignaciones & Actividad */}
      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-5">
          {/* Asignaciones en curso */}
          <Panel
            title="Asignaciones en curso"
            action={
              <Link href="/asignaciones" className="text-xs font-medium text-primary hover:underline">
                Ver todas ({assignments.length})
              </Link>
            }
          >
            <ul className="divide-y divide-border/80 text-xs">
              {assignments.slice(0, 4).map((a) => (
                <li key={a.id} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition-colors">
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-foreground truncate">{a.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {a.target} · Vence: {formatDate(a.dueDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={a.status} />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          {/* Documentos de Evaluación generados */}
          <Panel
            title="Documentos de evaluación recientes"
            action={
              <Link href="/historial" className="text-xs font-medium text-primary hover:underline">
                Historial completo
              </Link>
            }
          >
            <ul className="divide-y divide-border/80 text-xs">
              {documents.slice(0, 3).map((doc) => (
                <li key={doc.id} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition-colors">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{doc.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {doc.owner} · Generado el {formatDate(doc.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={doc.status} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Columna Derecha: Bitácora de Actividad Reciente */}
        <div className="lg:col-span-2">
          <Panel title="Bitácora de actividad reciente">
            <ul className="divide-y divide-border/80 text-xs">
              {recentActivity.map((item) => (
                <li key={item.id} className="px-4 py-3 hover:bg-secondary/40 transition-colors">
                  <p className="text-xs text-foreground leading-snug">{item.text}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground font-mono">{item.time}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}
