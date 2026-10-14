import { Injectable, signal } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  readonly isGenerating = signal<boolean>(false);
  readonly progressMessage = signal<string>('');

  /**
   * Genera y descarga un PDF de alta calidad a partir del contenedor de la hoja de trabajo.
   */
  async exportToPdf(
    containerElement: HTMLElement,
    filename = 'Hoja_de_Trabajo.pdf',
  ): Promise<void> {
    if (!containerElement) {
      alert('No se encontró el elemento para exportar.');
      return;
    }

    try {
      this.isGenerating.set(true);
      this.progressMessage.set('Preparando páginas para PDF...');

      // Buscar si hay páginas individuales definidas (.ht-page)
      const pageElements = containerElement.querySelectorAll<HTMLElement>('.ht-page');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter', // 215.9 mm x 279.4 mm
        compress: true,
      });

      const pageWidth = 215.9;
      const pageHeight = 279.4;

      if (pageElements && pageElements.length > 0) {
        // Renderizar página por página para evitar cortes de texto o problemas de salto
        for (let i = 0; i < pageElements.length; i++) {
          this.progressMessage.set(`Renderizando página ${i + 1} de ${pageElements.length}...`);
          const pageEl = pageElements[i];

          const canvas = await html2canvas(pageEl, {
            scale: 2, // 2x para nitidez retina
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff',
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);

          if (i > 0) {
            pdf.addPage('letter', 'portrait');
          }

          pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
        }
      } else {
        // En caso de que se exporte como un contenedor continuo
        this.progressMessage.set('Renderizando documento completo...');
        const canvas = await html2canvas(containerElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage('letter', 'portrait');
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
        }
      }

      this.progressMessage.set('Descargando PDF...');
      pdf.save(filename);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert(
        'Ocurrió un error al generar el PDF. Por favor intenta con la opción "Imprimir / Guardar como PDF" del navegador.',
      );
    } finally {
      this.isGenerating.set(false);
      this.progressMessage.set('');
    }
  }

  /**
   * Invoca el diálogo nativo de impresión del navegador.
   * Utiliza la regla @media print para una calidad vectorial óptima.
   */
  printNative(): void {
    window.print();
  }
}
