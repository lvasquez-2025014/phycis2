export interface PrintableAssignment {
  title: string
  studentName: string
  carnet?: string
  codigoAcademico?: string
  seccion?: string
  jornada?: string
  dueDate: string
  exercises: Array<{
    number: number
    title: string
    statement: string
    diagramUrl?: string
    diagramCaption?: string
    options?: {
      A: string
      B: string
      C: string
      D: string
    }
  }>
}

export function downloadAssignmentPdf(assignment: PrintableAssignment) {
  const carnet = assignment.carnet ?? "2021050"
  const academicCode = assignment.codigoAcademico ?? "IN6AM"
  const seccion = assignment.seccion ?? "A"
  const jornada = assignment.jornada ?? "Matutina"

  const content = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8" />
      <title>${assignment.title} - Carné ${carnet} - ${assignment.studentName}</title>
      <style>
        @page { size: A4; margin: 18mm; }
        body {
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: #2D3250;
          background: #ffffff;
          line-height: 1.6;
          margin: 0;
          padding: 24px;
        }
        .header {
          border-bottom: 2px solid #2D3250;
          padding-bottom: 12px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .brand {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }
        .subtitle {
          font-size: 11px;
          color: #64748B;
        }
        .meta-grid {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 10px 16px;
          margin-bottom: 16px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          font-size: 11px;
        }
        .meta-item strong {
          display: block;
          color: #64748B;
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .meta-item span {
          color: #111827;
          font-weight: 600;
        }
        .carnet-highlight {
          font-family: 'Courier New', monospace;
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          padding: 2px 6px;
          border-radius: 3px;
          display: inline-block;
          font-weight: 700;
          color: #111827;
        }
        .title-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 12px 16px;
          margin-bottom: 16px;
        }
        .title-box h1 {
          margin: 0 0 4px 0;
          font-size: 17px;
          font-weight: 700;
          color: #111827;
        }
        .title-box p {
          margin: 0;
          font-size: 11.5px;
          color: #475569;
        }
        .exercise {
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 14px 16px;
          margin-bottom: 16px;
          page-break-inside: avoid;
          background: #FFFFFF;
        }
        .exercise-title {
          font-weight: 700;
          font-size: 13px;
          color: #111827;
          margin-bottom: 6px;
        }
        .exercise-statement {
          font-size: 12px;
          line-height: 1.5;
          color: #1E293B;
          margin-bottom: 24px;
        }
        .answer-space {
          border-top: 1px dashed #94A3B8;
          padding-top: 8px;
          font-size: 10.5px;
          color: #64748B;
          display: flex;
          justify-content: space-between;
        }
        .footer {
          margin-top: 24px;
          border-top: 1px solid #E2E8F0;
          padding-top: 8px;
          font-size: 10px;
          color: #64748B;
          display: flex;
          justify-content: space-between;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">FísicaLab</div>
          <div class="subtitle">Hoja de Trabajo y Evaluación de Física Fundamental</div>
        </div>
        <div style="text-align: right; font-size: 12px; color: #7077A1;">
          <div>Colegio Técnico Kinal</div>
          <div>Física Fundamental Diversificado</div>
        </div>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <strong>Estudiante</strong>
          <span>${assignment.studentName}</span>
        </div>
        <div class="meta-item">
          <strong>No. Carné</strong>
          <span class="carnet-highlight">${carnet}</span>
        </div>
        <div class="meta-item">
          <strong>Código / Sección</strong>
          <span>${academicCode} - ${seccion} (${jornada})</span>
        </div>
        <div class="meta-item">
          <strong>Fecha Límite</strong>
          <span>${assignment.dueDate}</span>
        </div>
      </div>

      <div class="title-box">
        <h1>${assignment.title}</h1>
        <p>Instrucciones: Resuelve los problemas con su diagrama de cuerpo libre y procedimientos claros. Al terminar, ingresa tus respuestas finales en el portal del estudiante.</p>
      </div>

      ${assignment.exercises
        .map(
          (ex) => `
        <div class="exercise">
          <div class="exercise-title">Problema ${ex.number}: ${ex.title}</div>
          <div class="exercise-statement">${ex.statement}</div>
          ${
            ex.diagramUrl
              ? `
          <div style="text-align: center; margin: 12px 0;">
            <img src="${ex.diagramUrl}" style="max-height: 160px; max-width: 100%; border: 1px solid #CBD5E1; border-radius: 4px; padding: 4px; background: #fff;" alt="${ex.diagramCaption || "Diagrama"}" />
            ${ex.diagramCaption ? `<div style="font-size: 10px; color: #64748B; margin-top: 4px; font-style: italic;">${ex.diagramCaption}</div>` : ""}
          </div>
          `
              : ""
          }
          ${
            ex.options
              ? `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 10px 0; font-size: 11px;">
            <div style="border: 1px solid #CBD5E1; padding: 4px 8px; border-radius: 4px; background: #F8FAFC;"><strong>A:</strong> ${ex.options.A}</div>
            <div style="border: 1px solid #CBD5E1; padding: 4px 8px; border-radius: 4px; background: #F8FAFC;"><strong>B:</strong> ${ex.options.B}</div>
            <div style="border: 1px solid #CBD5E1; padding: 4px 8px; border-radius: 4px; background: #F8FAFC;"><strong>C:</strong> ${ex.options.C}</div>
            <div style="border: 1px solid #CBD5E1; padding: 4px 8px; border-radius: 4px; background: #F8FAFC;"><strong>D:</strong> ${ex.options.D}</div>
          </div>
          `
              : ""
          }
          <div class="answer-space">
            <span>Espacio para diagrama de cuerpo libre y cálculos:</span>
            <span>Opción seleccionada (A, B, C o D): _______</span>
          </div>
        </div>
      `,
        )
        .join("")}

      <div class="footer">
        <span>Asignación vinculada al carné ${carnet} · Física Fundamental</span>
        <span>Entrega requerida a través de FísicaLab</span>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `

  const blob = new Blob([content], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const printWindow = window.open(url, "_blank")
  if (!printWindow) {
    const a = document.createElement("a")
    a.href = url
    a.download = `${assignment.title.toLowerCase().replace(/\s+/g, "_")}_carnet_${carnet}.html`
    a.click()
  }
}
