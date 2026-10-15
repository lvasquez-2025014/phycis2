"use client"

import type { FormEvent } from "react"
import { toast } from "sonner"
import { Save, User, FileText, Bell } from "lucide-react"
import { Field, NativeSelect, Panel } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ANSWER_FORMATS } from "@/lib/data"

const NOTIFICATIONS = [
  { id: "n-submissions", label: "Nuevas respuestas entregadas por validar", description: "Notificar en el dashboard cuando un alumno envíe un formulario", defaultChecked: true },
  { id: "n-due", label: "Asignaciones próximas a vencer", description: "Alerta 24 horas antes del cierre de entrega por carné", defaultChecked: true },
  { id: "n-pdf", label: "Descarga de hojas de trabajo generadas", description: "Registrar evento cuando un estudiante genere su PDF", defaultChecked: false },
]

export function SettingsForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    toast.success("Configuración académica guardada correctamente")
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-4xl flex-col gap-5">
      <Panel
        title="Datos del Docente e Institución"
        description="Información que figurará en el encabezado de las hojas de trabajo y reportes generados."
      >
        <div className="grid gap-4 p-4 text-xs sm:grid-cols-2">
          <Field label="Nombre del Docente" htmlFor="cfg-name">
            <Input id="cfg-name" defaultValue="Prof. Laura Méndez" autoComplete="name" className="h-8 text-xs" />
          </Field>
          <Field label="Correo Institucional" htmlFor="cfg-email">
            <Input id="cfg-email" type="email" defaultValue="laura.mendez@kinal.edu.gt" autoComplete="email" className="h-8 text-xs" />
          </Field>
          <Field label="Institución Educativa" htmlFor="cfg-inst">
            <Input id="cfg-inst" defaultValue="Colegio Técnico Kinal" className="h-8 text-xs" />
          </Field>
          <Field label="Área / Cátedra" htmlFor="cfg-dept">
            <Input id="cfg-dept" defaultValue="Departamento de Ciencias · Física Fundamental" className="h-8 text-xs" />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Preconfiguración de Documentos PDF"
        description="Ajustes estándar para la exportación de hojas de trabajo y claves de corrección."
      >
        <div className="grid gap-4 p-4 text-xs sm:grid-cols-2">
          <Field label="Formato de respuestas predeterminado" htmlFor="cfg-format">
            <NativeSelect id="cfg-format" defaultValue="key" className="h-8 text-xs">
              {ANSWER_FORMATS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Tamaño de papel de impresión" htmlFor="cfg-size">
            <NativeSelect id="cfg-size" defaultValue="carta" className="h-8 text-xs">
              <option value="carta">Carta (US Letter - 8.5 x 11 in)</option>
              <option value="a4">A4 (210 x 297 mm)</option>
              <option value="oficio">Oficio (Folio / Legal)</option>
            </NativeSelect>
          </Field>
        </div>
      </Panel>

      <Panel
        title="Alertas y Notificaciones del Sistema"
        description="Gestiona qué eventos académicos deben generar recordatorios."
      >
        <ul className="divide-y divide-border/60">
          {NOTIFICATIONS.map((n) => (
            <li key={n.id} className="p-4 hover:bg-secondary/40 transition-colors">
              <label htmlFor={n.id} className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-xs font-medium text-foreground">{n.label}</p>
                  <p className="text-[11px] text-muted-foreground">{n.description}</p>
                </div>
                <Switch id={n.id} defaultChecked={n.defaultChecked} />
              </label>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="submit"
          className="h-8 px-4 text-xs font-medium gap-1.5"
        >
          <Save className="size-3.5" />
          <span>Guardar configuración</span>
        </Button>
      </div>
    </form>
  )
}
