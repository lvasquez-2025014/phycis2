"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_ITEMS, getActiveNav } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

const navBadges: Record<string, string> = {
  "/ejercicios": "12",
  "/estudiantes": "6",
  "/asignaciones": "4",
  "/validacion": "2",
}

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const active = getActiveNav(pathname)
  const { logout, user } = useAuth()

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border pt-4">
      <nav aria-label="Navegación principal" className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="px-3 pb-2.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/70 font-mono">
          Módulos de Cátedra
        </div>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === active.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3.5 py-2 text-xs transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-xs"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white font-medium",
                  )}
                >
                  <span className="truncate">{item.label}</span>
                  {navBadges[item.href] && (
                    <span
                      className={cn(
                        "font-mono text-[10px] font-semibold px-1.5 py-0.2 rounded-full border",
                        isActive
                          ? "bg-[#2D3250] text-[#F6B17A] border-[#2D3250]"
                          : "bg-sidebar-accent text-sidebar-foreground border-sidebar-border",
                      )}
                    >
                      {navBadges[item.href]}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Perfil del Docente & Cerrar Sesión */}
      <div className="flex items-center gap-3 border-t border-sidebar-border px-4 py-3 bg-sidebar-accent/50">
        <span className="flex size-7 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-white border border-sidebar-border">
          {user?.avatar ?? "LM"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-white">{user?.name ?? "Laura Méndez"}</p>
          <p className="text-[10.5px] text-sidebar-foreground/75">{user?.roleLabel ?? "Profesora"}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg px-2 py-1 text-xs font-medium transition-colors hover:bg-sidebar-accent text-sidebar-foreground hover:text-white"
          title="Cerrar sesión"
        >
          Salir
        </button>
      </div>
    </div>
  )
}
