import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@fisica-tareas/shared';
import { pdfService } from './pdf.service';

export class PdfController {
  public async exportAssignment(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const assignmentId = req.params.assignmentId;
      const studentId = req.query.studentId as string | undefined;
      const result = await pdfService.preparePdfExport(assignmentId, studentId);

      return res.status(200).json({
        success: true,
        data: result,
        meta: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const pdfController = new PdfController();
