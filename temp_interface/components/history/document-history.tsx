"use client"

import { useState } from "react"
import { Download, FileText, FileX, RotateCw } from "lucide-react"
import { toast } from "sonner"
import { EmptyState, NativeSelect, PageHeader, Panel, SearchInput, StatusBadge } from "@/components/shared"
import { VernierCaliperIllustration } from "@/components/shared/technical-illustrations"
import { Button } from "@/components/ui/button"
import { ANSWER_FORMATS, documents, formatDate, formatLabel } from "@/lib/data"

export function DocumentHistory() {
  const [query, setQuery] = useState("")
  const [format, setFormat] = useState("")

  const q = query.toLowerCase()
  const filtered = documents.filter(
    (d) =>
      (!q || d.name.toLowerCase().includes(q) || d.owner.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)) &&
      (!format || d.format === format),
  )

  return (
    <>
      <PageHeader
        kicker="Control de Versiones y Archivo Histórico"
        title="Historial de Documentos"
        badge={
          <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 text-[11px] font-mono font-medium text-foreground">
            {documents.length} archivos
          </span>
        }
        description="Registro cronológico y control de versiones de hojas de trabajo y exámenes generados."
        illustration={<VernierCaliperIllustration />}
      />

      <Panel>
        <div className="flex flex-col gap-2 border-b border-border/80 bg-card p-3 sm:flex-row sm:items-center">
          <SearchInput
            placeholder="Buscar por código, documento o estudiante..."
            aria-label="Buscar documentos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <NativeSelect
            aria-label="Filtrar por formato"
            className="sm:w-56 text-xs h-8"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">Todos los formatos</option>
            {ANSWER_FORMATS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </NativeSelect>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={FileX}
            title="Sin documentos"
            description="No se encontraron registros de documentos con los filtros actuales."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/40 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                  <th scope="col" className="px-4 py-2.5">Código</th>
                  <th scope="col" className="px-4 py-2.5">Documento</th>
                  <th scope="col" className="px-4 py-2.5">Destinatario / Generó</th>
                  <th scope="col" className="px-4 py-2.5">Formato</th>
                  <th scope="col" className="px-4 py-2.5">Ejercicios</th>
                  <th scope="col" className="px-4 py-2.5">Fecha</th>
                  <th scope="col" className="px-4 py-2.5">Estado</th>
                  <th scope="col" className="px-4 py-2.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-secondary/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] font-medium text-muted-foreground">
                      {d.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                        <span className="font-medium text-foreground">{d.name}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground pl-5.5">{d.assignment}</p>
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {d.owner}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                        {formatLabel(d.format)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground font-mono">
                      {d.exercises} items
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono">
                      {formatDate(d.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs gap-1 border-border px-2 text-foreground hover:bg-secondary"
                        onClick={() =>
                          toast.success(
                            d.status === "Listo"
                              ? `Descargando copia PDF: ${d.name}`
                              : `Regenerando documento: ${d.name}`
                          )
                        }
                      >
                        {d.status === "Listo" ? (
                          <>
                            <Download className="size-3" aria-hidden />
                            <span>Descargar</span>
                          </>
                        ) : (
                          <>
                            <RotateCw className="size-3" aria-hidden />
                            <span>Regenerar</span>
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  )
}
