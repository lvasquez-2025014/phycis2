import { AppError } from '../../middlewares/errorHandler';
import { assignmentsRepository } from '../assignments/assignments.repository';

export class PdfService {
  /**
   * Prepara los datos y metadatos para la futura generación del documento PDF
   * (Estructura base lista para integración con generadores como pdfmake o puppeteer)
   */
  public async preparePdfExport(assignmentId: string, studentId?: string) {
    const assignment = await assignmentsRepository.findById(assignmentId);
    if (!assignment) {
      throw new AppError('Tarea no encontrada para exportar a PDF', 404, 'ASSIGNMENT_NOT_FOUND');
    }

    const recipient = studentId
      ? assignment.recipients?.find((r) => r.studentId === studentId)
      : assignment.recipients?.[0];

    return {
      status: 'PREPARED',
      message: 'Estructura base de PDF lista para compilación.',
      assignmentTitle: assignment.title,
      topicName: assignment.topicName,
      studentName: recipient?.studentName || 'Plantilla Docente General',
      exerciseCount: recipient?.exercises?.length || assignment.exerciseCount,
      exportDate: new Date().toISOString(),
    };
  }
}

export const pdfService = new PdfService();
