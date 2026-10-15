"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

export function StudentHeader({
  activeTab,
  onTabChange,
}: {
  activeTab?: "tareas" | "resultados"
  onTabChange?: (tab: "tareas" | "resultados") => void
}) {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      {/* Brand & Student Tabs */}
      <div className="flex items-center gap-6">
        <Link href="/estudiante" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight text-foreground">
            FísicaLab
          </span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
            Estudiante
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Navegación del estudiante">
          <button
            type="button"
            onClick={() => onTabChange?.("tareas")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              (activeTab ?? "tareas") === "tareas"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            Mis tareas
          </button>
          <button
            type="button"
            onClick={() => onTabChange?.("resultados")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              activeTab === "resultados"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            Resultados
          </button>
        </nav>
      </div>

      {/* User profile & Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-xs font-medium text-foreground leading-tight">
            {user?.name ?? "Camila Torres"}
          </p>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Carné {user?.carnet ?? "2021050"} {user?.codigoAcademico ? `· ${user.codigoAcademico}-${user.seccion}` : ""}
          </p>
        </div>

        <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground border border-border">
          {user?.avatar ?? "CT"}
        </span>

        <button
          type="button"
          onClick={logout}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="size-4" aria-hidden />
          <span className="sr-only">Cerrar sesión</span>
        </button>
      </div>
    </header>
  )
}
