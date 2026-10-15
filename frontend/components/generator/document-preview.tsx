import type { AnswerFormatId, Exercise } from "@/lib/data"

export function DocumentPreview({
  title,
  format,
  items,
}: {
  title: string
  format: AnswerFormatId
  items: Exercise[]
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-100/60 p-4 sm:p-6">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-500">
          Vista previa del PDF impreso
        </span>
        <span>Formato: {format}</span>
      </div>

      <article
        aria-label="Vista previa del documento"
        className="mx-auto max-w-xl rounded border border-slate-300/80 bg-white p-8 text-xs leading-relaxed shadow-sm sm:p-10 text-slate-900"
      >
        <header className="border-b border-slate-300 pb-4">
          <div className="flex items-center justify-between text-[11px] tracking-wide text-slate-500 uppercase">
            <span>Colegio Técnico Kinal</span>
            <span>Física Fundamental</span>
          </div>
          <h2 className="mt-2 text-base font-bold text-slate-900 text-balance">
            {title || "Hoja de Trabajo de Física"}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-4 text-[11px] text-slate-600 border-t border-dashed border-slate-200 pt-2">
            <div>Nombre: __________________________________</div>
            <div>Carné: ____________ Secc: _____</div>
            <div>Fecha: _________________</div>
            <div>Punteo: ______ / 100 pts</div>
          </div>
        </header>

        <ol className="mt-5 flex flex-col gap-6">
          {items.map((e, i) => (
            <li key={e.id} className="text-xs">
              <p className="font-medium text-slate-900">
                <span className="font-bold text-slate-950">{i + 1}.</span> {e.statement}
              </p>

              {/* Diagrama si existe */}
              {e.diagramUrl && (
                <div className="my-2.5 max-w-sm rounded border border-slate-200 bg-slate-50/50 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.diagramUrl}
                    alt={e.diagramCaption ?? "Diagrama del ejercicio"}
                    className="h-auto max-h-36 w-full object-contain"
                  />
                  {e.diagramCaption && (
                    <p className="mt-1 text-center text-[10px] text-slate-500 italic">
                      {e.diagramCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Opciones A, B, C, D si existen */}
              {e.options && (
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700">
                  <span><strong className="text-slate-900">A)</strong> {e.options.A}</span>
                  <span><strong className="text-slate-900">B)</strong> {e.options.B}</span>
                  <span><strong className="text-slate-900">C)</strong> {e.options.C}</span>
                  <span><strong className="text-slate-900">D)</strong> {e.options.D}</span>
                </div>
              )}

              {/* Respuestas según formato */}
              {format === "inline" && (
                <p className="mt-2 rounded bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-800 border border-blue-200/60">
                  Respuesta correcta: {e.correctOption ? `Opción ${e.correctOption} (${e.answer})` : e.answer}
                </p>
              )}
              {format === "steps" && (
                <p className="mt-2 rounded bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-800 border border-blue-200/60">
                  {e.hasSteps
                    ? `Solución: Planteamiento → Ecuación de Newton → Sustitución → ${e.answer}`
                    : `Respuesta: ${e.answer}`}
                </p>
              )}
              {(format === "none" || format === "key") && (
                <div className="mt-3 h-12 border-b border-dashed border-slate-300" aria-label="Espacio para procedimiento" />
              )}
            </li>
          ))}
        </ol>

        {format === "key" && (
          <footer className="mt-8 border-t-2 border-slate-300 pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Clave de Respuestas (Uso Exclusivo del Docente)
            </p>
            <ol className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-600">
              {items.map((e, i) => (
                <li key={e.id}>
                  <strong className="text-slate-800">{i + 1}.</strong> {e.correctOption ? `[${e.correctOption}] ` : ""}{e.answer}
                </li>
              ))}
            </ol>
          </footer>
        )}
      </article>
    </div>
  )
}
