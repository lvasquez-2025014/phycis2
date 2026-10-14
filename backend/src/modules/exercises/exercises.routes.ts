import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { exercisesController } from './exercises.controller';

const router = Router();

router.get('/topics', authenticate, (req, res, next) =>
  exercisesController.getTopics(req, res, next),
);

router.get('/', authenticate, (req, res, next) => exercisesController.list(req, res, next));

router.get('/:id', authenticate, (req, res, next) => exercisesController.getById(req, res, next));

export const exercisesRoutes = router;
