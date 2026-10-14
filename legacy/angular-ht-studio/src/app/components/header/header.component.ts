import { Component, inject, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksheetDataService } from '../../services/worksheet-data.service';
import { PdfExportService } from '../../services/pdf-export.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header no-print">
      <div class="header-brand">
        <div class="brand-logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div class="brand-info">
          <h1>HT Studio <span>Editor & PDF</span></h1>
          <p class="subtitle">{{ dataService.worksheet().header.htCodeAndTitle }}</p>
        </div>
      </div>

      <div class="header-actions">
        <!-- Modo Selector Alumno vs Solucionario Docente -->
        <div class="mode-toggle-group">
          <button
            type="button"
            class="mode-btn"
            [class.active]="dataService.worksheet().mode === 'student'"
            (click)="dataService.setMode('student')"
            title="Hoja de trabajo limpia con espacios vacíos para estudiantes"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Modo Alumno
          </button>
          <button
            type="button"
            class="mode-btn teacher"
            [class.active]="dataService.worksheet().mode === 'teacher'"
            (click)="dataService.setMode('teacher')"
            title="Muestra respuestas correctas y resoluciones del profesor"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Modo Docente
          </button>
        </div>

        <div class="divider"></div>

        <!-- Botones de plantilla -->
        <button
          type="button"
          class="btn btn-secondary"
          (click)="dataService.resetToDefault()"
          title="Cargar la Hoja de Trabajo HT01 MRU con todos los ejercicios y gráficos"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
          </svg>
          Plantilla Word Oficial (Kinal)
        </button>

        <button
          type="button"
          class="btn btn-secondary"
          (click)="dataService.createBlank()"
          title="Crear una hoja de trabajo vacía desde cero"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Nueva HT
        </button>

        <!-- Importar / Exportar JSON -->
        <div class="dropdown">
          <button
            type="button"
            class="btn btn-ghost"
            (click)="toggleJsonMenu()"
            title="Opciones de archivo"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            JSON
          </button>
          @if (showJsonMenu) {
            <div class="dropdown-menu">
              <button (click)="downloadJson()">Descargar plantilla JSON</button>
              <label class="dropdown-file-btn">
                Importar plantilla JSON
                <input
                  type="file"
                  accept=".json"
                  (change)="onFileSelected($event)"
                  style="display: none;"
                />
              </label>
            </div>
          }
        </div>

        <div class="divider"></div>

        <!-- Botones de Impresión y Generación PDF -->
        <button
          type="button"
          class="btn btn-secondary"
          (click)="pdfService.printNative()"
          title="Abre la ventana de impresión nativa (Guardar como PDF en alta resolución)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path
              d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
            ></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Imprimir
        </button>

        <button
          type="button"
          class="btn btn-primary"
          [disabled]="pdfService.isGenerating()"
          (click)="generatePdf.emit()"
          title="Descargar documento en formato PDF"
        >
          @if (pdfService.isGenerating()) {
            <span class="spinner"></span>
            <span>Generando...</span>
          } @else {
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Generar Tarea (PDF)</span>
          }
        </button>
      </div>
    </header>
  `,
  styles: [
    `
      .app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1.5rem;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border-ui);
        position: sticky;
        top: 0;
        z-index: 100;
        gap: 1rem;
      }

      .header-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .brand-logo {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: linear-gradient(135deg, #6366f1, #4338ca);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 4px 12px var(--primary-glow);
      }

      .brand-info h1 {
        font-size: 1.15rem;
        font-weight: 700;
        font-family: var(--font-display);
        color: white;
        letter-spacing: -0.02em;
      }

      .brand-info h1 span {
        font-size: 0.75rem;
        font-weight: 500;
        background: rgba(99, 102, 241, 0.2);
        color: #a5b4fc;
        padding: 2px 8px;
        border-radius: 9999px;
        margin-left: 6px;
        border: 1px solid rgba(99, 102, 241, 0.3);
      }

      .subtitle {
        font-size: 0.75rem;
        color: var(--text-muted);
        max-width: 320px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .mode-toggle-group {
        display: flex;
        background: #090d16;
        border-radius: 8px;
        padding: 3px;
        border: 1px solid var(--border-ui);
      }

      .mode-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        border: none;
        background: transparent;
        color: var(--text-muted);
        font-size: 0.8rem;
        font-weight: 500;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .mode-btn:hover {
        color: white;
      }

      .mode-btn.active {
        background: #1e293b;
        color: #38bdf8;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .mode-btn.teacher.active {
        background: rgba(16, 185, 129, 0.15);
        color: #34d399;
        border: 1px solid rgba(16, 185, 129, 0.3);
      }

      .divider {
        width: 1px;
        height: 24px;
        background: var(--border-ui);
        margin: 0 4px;
      }

      .btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        font-size: 0.82rem;
        font-weight: 500;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
        border: 1px solid transparent;
        font-family: var(--font-body);
      }

      .btn-primary {
        background: linear-gradient(135deg, #4f46e5, #4338ca);
        color: white;
        border-color: #6366f1;
        box-shadow: 0 2px 8px var(--primary-glow);
      }

      .btn-primary:hover:not(:disabled) {
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        transform: translateY(-1px);
      }

      .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .btn-secondary {
        background: #1e293b;
        color: #e2e8f0;
        border-color: #334155;
      }

      .btn-secondary:hover {
        background: #334155;
        color: white;
      }

      .btn-ghost {
        background: transparent;
        color: #94a3b8;
        border: 1px solid #334155;
      }

      .btn-ghost:hover {
        background: #1e293b;
        color: white;
      }

      .dropdown {
        position: relative;
      }

      .dropdown-menu {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        padding: 4px;
        min-width: 190px;
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .dropdown-menu button,
      .dropdown-file-btn {
        background: none;
        border: none;
        color: #cbd5e1;
        padding: 8px 12px;
        text-align: left;
        font-size: 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.15s;
        display: block;
        width: 100%;
      }

      .dropdown-menu button:hover,
      .dropdown-file-btn:hover {
        background: #334155;
        color: white;
      }

      .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class HeaderComponent {
  readonly dataService = inject(WorksheetDataService);
  readonly pdfService = inject(PdfExportService);

  readonly generatePdf = output<void>();

  showJsonMenu = false;

  toggleJsonMenu() {
    this.showJsonMenu = !this.showJsonMenu;
  }

  downloadJson() {
    this.showJsonMenu = false;
    const jsonStr = this.dataService.exportToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HT_Plantilla.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  onFileSelected(event: Event) {
    this.showJsonMenu = false;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          const success = this.dataService.importFromJson(content);
          if (success) {
            alert('¡Plantilla cargada correctamente!');
          } else {
            alert('El archivo JSON no tiene un formato válido.');
          }
        }
      };
      reader.readAsText(file);
    }
  }
}
