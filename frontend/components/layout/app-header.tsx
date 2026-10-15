"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Bell, Menu, Search, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { AppSidebar } from "./app-sidebar"
import { getActiveNav } from "@/lib/nav"
import { useAuth } from "@/lib/auth-context"

export function AppHeader() {
  const pathname = usePathname()
  const active = getActiveNav(pathname)
  const [open, setOpen] = useState(false)
  const { logout, user } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-4 sm:px-6 shadow-2xs">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden className="size-4.5" />
        <span className="sr-only">Abrir menú</span>
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 border-0 p-0" showCloseButton={false}>
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <nav aria-label="Ruta" className="min-w-0 flex-1 text-xs">
        <ol className="flex items-center gap-1.5 text-muted-foreground">
          <li className="font-semibold text-foreground">FísicaLab</li>
          <li aria-hidden className="text-muted-foreground/40">/</li>
          <li className="font-medium text-foreground" aria-current="page">
            {active.label}
          </li>
          <li className="hidden md:inline-flex items-center ml-2 pl-2 border-l border-border text-[11px] text-muted-foreground">
            Colegio Técnico Kinal · Área de Física
          </li>
        </ol>
      </nav>

      <div className="relative hidden w-56 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          placeholder="Buscar recurso..."
          aria-label="Buscar en FísicaLab"
          className="h-8.5 rounded-full bg-secondary/50 text-xs pl-8.5 pr-3 border-border placeholder:text-muted-foreground focus:bg-white shadow-2xs font-sans"
        />
      </div>

      <Button variant="ghost" size="icon" className="relative size-8 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
        <Bell className="size-4" aria-hidden />
        <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent ring-2 ring-card" aria-hidden />
        <span className="sr-only">Notificaciones</span>
      </Button>

      <div className="flex items-center gap-2 pl-2 border-l border-border">
        <span className="flex size-7.5 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-primary border border-border shadow-2xs">
          {user?.avatar ?? "LM"}
        </span>

        {/* Botón Cerrar Sesión */}
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="h-8 px-3.5 text-xs rounded-full font-semibold text-foreground border-border bg-card hover:bg-secondary hover:text-foreground transition-colors shadow-2xs"
          title="Cerrar sesión"
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}
