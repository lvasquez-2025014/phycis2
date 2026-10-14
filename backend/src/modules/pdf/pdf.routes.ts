import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { pdfController } from './pdf.controller';

const router = Router();

router.get('/export/:assignmentId', authenticate, (req, res, next) =>
  pdfController.exportAssignment(req, res, next),
);

export const pdfRoutes = router;
