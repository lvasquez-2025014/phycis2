import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { authenticate } from '../../middlewares/authMiddleware';
import { loginSchema } from './auth.schema';
import { authController } from './auth.controller';

const router = Router();

router.post('/login', validateRequest({ body: loginSchema }), (req, res, next) =>
  authController.login(req, res, next),
);

router.get('/me', authenticate, (req, res, next) => authController.getCurrentUser(req, res, next));

export const authRoutes = router;
