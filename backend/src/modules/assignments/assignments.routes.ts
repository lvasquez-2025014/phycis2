import { Router } from 'express';
import { authenticate, requireRole } from '../../middlewares/authMiddleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { generateAssignmentSchema } from './assignments.schema';
import { assignmentsController } from './assignments.controller';

const router = Router();

// Listar tareas (filtrado automáticamente según rol docente o estudiante)
router.get('/', authenticate, (req, res, next) => assignmentsController.list(req, res, next));

// Obtener detalle de una tarea
router.get('/:id', authenticate, (req, res, next) => assignmentsController.getById(req, res, next));

// Generar una nueva tarea (sólo docentes)
router.post(
  '/generate',
  authenticate,
  requireRole('TEACHER'),
  validateRequest({ body: generateAssignmentSchema }),
  (req, res, next) => assignmentsController.generate(req, res, next),
);

export const assignmentsRoutes = router;
