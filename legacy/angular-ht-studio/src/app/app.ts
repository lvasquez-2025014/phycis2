import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { EditorComponent } from './components/editor/editor.component';
import { WorksheetPreviewComponent } from './components/worksheet-preview/worksheet-preview.component';
import { PdfExportService } from './services/pdf-export.service';
import { WorksheetDataService } from './services/worksheet-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, EditorComponent, WorksheetPreviewComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly pdfService = inject(PdfExportService);
  readonly dataService = inject(WorksheetDataService);

  // Modo de vista en pantalla
  viewMode = signal<'split' | 'preview_only' | 'editor_only'>('split');

  setViewMode(mode: 'split' | 'preview_only' | 'editor_only') {
    this.viewMode.set(mode);
  }

  async onGeneratePdf() {
    const el = document.getElementById('printable-worksheet');
    if (!el) {
      alert('No se pudo encontrar la hoja para exportar.');
      return;
    }

    const header = this.dataService.worksheet().header;
    const isTeacher = this.dataService.worksheet().mode === 'teacher';
    const filename = `HT01_MRU_${isTeacher ? 'Solucionario_Docente' : 'Hoja_Trabajo'}.pdf`;

    await this.pdfService.exportToPdf(el, filename);
  }
}
