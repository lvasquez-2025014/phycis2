import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { usersController } from './users.controller';

const router = Router();

router.get('/', authenticate, (req, res, next) => usersController.list(req, res, next));
router.get('/:id', authenticate, (req, res, next) => usersController.getById(req, res, next));

export const usersRoutes = router;
