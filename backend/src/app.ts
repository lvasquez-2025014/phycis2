import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ApiResponse } from '@fisica-tareas/shared';
import { env } from './config/env';
import { errorHandler, AppError } from './middlewares/errorHandler';
import { authRoutes } from './modules/auth/auth.routes';
import { usersRoutes } from './modules/users/users.routes';
import { exercisesRoutes } from './modules/exercises/exercises.routes';
import { assignmentsRoutes } from './modules/assignments/assignments.routes';
import { pdfRoutes } from './modules/pdf/pdf.routes';

const app: Application = express();

// Configuración de CORS con el origen del frontend
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);

// Parser de JSON
app.use(express.json());

// Ruta de comprobación de salud del servidor
app.get('/api/health', (_req: Request, res: Response<ApiResponse>) => {
  return res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      uptime: process.uptime(),
      environment: env.NODE_ENV,
      service: 'fisica-tareas-backend',
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
});

// Montaje de rutas de módulos
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/pdf', pdfRoutes);

// Manejador de rutas no encontradas (404)
app.use((req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND'));
});

// Middleware centralizado de errores
app.use(errorHandler);

export default app;
