import {
  CheckCheck,
  ClipboardList,
  FileText,
  History,
  LayoutDashboard,
  Library,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

export type NavItem = { label: string; href: string; icon: LucideIcon }

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Banco de ejercicios", href: "/ejercicios", icon: Library },
  { label: "Estudiantes", href: "/estudiantes", icon: Users },
  { label: "Asignaciones", href: "/asignaciones", icon: ClipboardList },
  { label: "Generador PDF", href: "/generador", icon: FileText },
  { label: "Historial de documentos", href: "/historial", icon: History },
  { label: "Validación de respuestas", href: "/validacion", icon: CheckCheck },
  { label: "Configuración", href: "/configuracion", icon: Settings },
]

export function getActiveNav(pathname: string) {
  return (
    NAV_ITEMS.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? NAV_ITEMS[0]
  )
}
